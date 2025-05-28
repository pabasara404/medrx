<?php
namespace App\Http\Controllers;

use App\Mail\QuotationMail;
use App\Models\Prescription;
use App\Models\Quotation;
use App\Http\Requests\StoreQuotationRequest;
use App\Http\Requests\UpdateQuotationRequest;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource for users
     */
    public function index(): \Inertia\Response|\Inertia\ResponseFactory
    {
        $user = auth()->user();
        $quotations = Quotation::with(['prescription', 'prescription.user'])
            ->whereHas('prescription', fn($q) => $q->where('user_id', $user->id))
            ->latest()
            ->get()
            ->map(function ($q) {
                $q->items = json_decode($q->items); // decode JSON string to array
                return $q;
            });

        return inertia('UserQuotations', [
            'quotations' => $quotations,
        ]);
    }


    /**
     * Store a newly created quotation
     */
    public function store(Request $request, $prescriptionId): \Illuminate\Http\RedirectResponse
    {
        // Validate the request
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.drug' => 'required|string|max:255',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        // Check if prescription exists and user is pharmacy
        $prescription = Prescription::findOrFail($prescriptionId);

        if (auth()->user()->role !== 'pharmacy') {
            abort(403, 'Only pharmacy users can create quotations');
        }

        // Calculate totals for each item
        $items = [];
        $total = 0;

        foreach ($request->items as $item) {
            $amount = $item['qty'] * $item['unit_price'];
            $items[] = [
                'drug' => $item['drug'],
                'qty' => (int)$item['qty'],
                'unit_price' => (float)$item['unit_price'],
                'amount' => $amount,
            ];
            $total += $amount;
        }

        // Check if quotation already exists for this prescription
        $existingQuotation = Quotation::where('prescription_id', $prescriptionId)->first();

        if ($existingQuotation) {
            // Update existing quotation
            $existingQuotation->update([
                'items' => json_encode($items),
                'total' => $total,
                'status' => 'quoted', // Reset status when updating
            ]);
            $quotation = $existingQuotation;
        } else {
            // Create new quotation
            $quotation = Quotation::create([
                'prescription_id' => $prescriptionId,
                'items' => json_encode($items),
                'total' => $total,
                'status' => 'quoted',
            ]);
        }

        // Send email notification to user
        $user = $prescription->user;
        try {
            Mail::to($user->email)->send(new QuotationMail($quotation));
        } catch (\Exception $e) {
            // Log the error but don't fail the request
            \Log::error('Failed to send quotation email: ' . $e->getMessage());
        }

        return back()->with('success', 'Quotation sent to user successfully!');
    }

    /**
     * Handle user response to quotation (accept/reject)
     */
    public function respond($id, Request $request)
    {
        $request->validate([
            'response' => 'required|in:accepted,rejected'
        ]);

        $quotation = Quotation::findOrFail($id);

        // Check if user owns this quotation
        if ($quotation->prescription->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to quotation');
        }

        $quotation->status = $request->response;
        $quotation->save();

        // Send notification to pharmacy
        $pharmacy = User::where('role', 'pharmacy')->first();
        if ($pharmacy) {
            try {
                Mail::to($pharmacy->email)->send(new \App\Mail\UserResponseMail($quotation));
            } catch (\Exception $e) {
                \Log::error('Failed to send response email: ' . $e->getMessage());
            }
        }

        $message = $request->response === 'accepted'
            ? 'Quotation accepted successfully!'
            : 'Quotation rejected successfully!';

        return back()->with('success', $message);
    }

    /**
     * Get quotation details
     */
    public function show(Quotation $quotation)
    {
        $quotation->load(['prescription', 'prescription.user']);

        // Check authorization
        $user = auth()->user();
        if ($user->role !== 'pharmacy' && $quotation->prescription->user_id !== $user->id) {
            abort(403, 'Unauthorized access to quotation');
        }

        return response()->json($quotation);
    }

    public function update(Request $request, Quotation $quotation): \Illuminate\Http\RedirectResponse
    {
        // Validate the request
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.drug' => 'required|string|max:255',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        // Check if user is pharmacy
        if (auth()->user()->role !== 'pharmacy') {
            abort(403, 'Only pharmacy users can update quotations');
        }

        // Calculate totals for each item
        $items = [];
        $total = 0;

        foreach ($request->items as $item) {
            $amount = $item['qty'] * $item['unit_price'];
            $items[] = [
                'drug' => $item['drug'],
                'qty' => (int)$item['qty'],
                'unit_price' => (float)$item['unit_price'],
                'amount' => $amount,
            ];
            $total += $amount;
        }

        // Update the quotation
        $quotation->update([
            'items' => json_encode($items),
            'total' => $total,
            'status' => 'quoted',
        ]);

        // Send email notification to user
        $user = $quotation->prescription->user;
        try {
            Mail::to($user->email)->send(new QuotationMail($quotation));
        } catch (\Exception $e) {
            \Log::error('Failed to send quotation email: ' . $e->getMessage());
        }

        return back()->with('success', 'Quotation updated successfully!');
    }
}
