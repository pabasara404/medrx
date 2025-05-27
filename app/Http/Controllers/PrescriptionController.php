<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'pharmacy') {
            // Load prescriptions with user and quotations for pharmacy users
            $prescriptions = Prescription::with(['user', 'quotations' => function($query) {
                $query->latest()->limit(1); // Get the latest quotation
            }])->latest()->get();
        } else {
            // Load user's prescriptions with quotations for regular users
            $prescriptions = $user->prescriptions()
                ->with(['quotations' => function($query) {
                    $query->latest()->limit(1);
                }])
                ->latest()
                ->get();
        }

        return Inertia::render('Dashboard', [
            'prescriptions' => $prescriptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrescriptionRequest $request)
    {
        $request->validate([
            'note' => 'required|string',
            'delivery_address' => 'required|string',
            'delivery_slot' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $images[] = $image->store('prescriptions', 'public');
            }
        }

        Prescription::create([
            'user_id' => Auth::id(),
            'images' => json_encode($images),
            'note' => $request->note,
            'delivery_address' => $request->delivery_address,
            'delivery_slot' => $request->delivery_slot,
        ]);

        return redirect()->route('dashboard')->with('success', 'Prescription uploaded successfully!');
    }

    /**
     * Display the specified resource with detailed information
     */
    public function show(Prescription $prescription)
    {
        // Load prescription with user and quotations
        $prescription->load(['user', 'quotations.items']);

        // Check authorization
        $user = auth()->user();
        if ($user->role !== 'pharmacy' && $prescription->user_id !== $user->id) {
            abort(403, 'Unauthorized access to prescription');
        }

        return response()->json($prescription);
    }
}
