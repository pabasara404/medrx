<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use App\Models\Quotation;
use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'pharmacy') {
            // For pharmacy users, show all prescriptions with their quotations
            $prescriptions = Prescription::with(['user', 'quotations' => function($query) {
                $query->latest();
            }])->latest()->get();

            return inertia('Dashboard', [
                'prescriptions' => $prescriptions,
            ]);
        } else {
            // For regular users, show their prescriptions with quotations
            $prescriptions = Prescription::with(['quotations' => function($query) {
                $query->latest();
            }])->where('user_id', $user->id)->latest()->get();

            $quotations = Quotation::with(['prescription', 'prescription.user'])
                ->whereHas('prescription', fn($q) => $q->where('user_id', $user->id))
                ->latest()
                ->get()
                ->map(function ($q) {
                    $q->items = json_decode($q->items);
                    return $q;
                });

            return inertia('Dashboard', [
                'prescriptions' => $prescriptions,
                'quotations' => $quotations,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Prescriptions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrescriptionRequest $request)
    {
        $validated = $request->validated();

        // Handle multiple image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('prescriptions', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = json_encode($imagePaths); // Store as JSON
        }

        // Handle single file upload (backwards compatibility)
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('prescriptions', 'public');
            $validated['file_path'] = $path;
        }

        $validated['user_id'] = auth()->id();

        Prescription::create($validated);

        return back()->with('success', 'Prescription uploaded successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Prescription $prescription)
    {
        // Check if user can view this prescription
        $user = auth()->user();
        if ($user->role !== 'pharmacy' && $prescription->user_id !== $user->id) {
            abort(403, 'Unauthorized access to prescription');
        }

        $prescription->load(['user', 'quotations' => function($query) {
            $query->latest();
        }]);

        // Decode quotation items if they exist
        if ($prescription->quotations) {
            $prescription->quotations->transform(function ($quotation) {
                $quotation->items = json_decode($quotation->items);
                return $quotation;
            });
        }

        return response()->json($prescription);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prescription $prescription)
    {
        // Check authorization
        if ($prescription->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to prescription');
        }

        return inertia('Prescriptions/Edit', [
            'prescription' => $prescription,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrescriptionRequest $request, Prescription $prescription)
    {
        // Check authorization
        if ($prescription->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to prescription');
        }

        $validated = $request->validated();

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($prescription->file_path) {
                Storage::disk('public')->delete($prescription->file_path);
            }

            $path = $request->file('file')->store('prescriptions', 'public');
            $validated['file_path'] = $path;
        }

        $prescription->update($validated);

        return back()->with('success', 'Prescription updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prescription $prescription)
    {
        // Check authorization
        if ($prescription->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to prescription');
        }

        // Delete file if exists
        if ($prescription->file_path) {
            Storage::disk('public')->delete($prescription->file_path);
        }

        $prescription->delete();

        return back()->with('success', 'Prescription deleted successfully!');
    }
}
