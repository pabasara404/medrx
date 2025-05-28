@component('mail::message')
    # Your Prescription Quotation

    Dear {{ $prescription->user->name }},

    We have prepared a quotation for your prescription (ID: #{{ $prescription->id }}).

    ## Quotation Details

    @component('mail::table')
        | Drug | Quantity | Unit Price | Amount |
        |------|----------|------------|--------|
        @foreach ($items as $item)
            | {{ $item['drug'] }} | {{ $item['qty'] }} | ${{ number_format($item['unit_price'], 2) }} | ${{ number_format($item['qty'] * $item['unit_price'], 2) }} |
        @endforeach
        | **Total** | | | **${{ number_format($quotation->total, 2) }}** |
    @endcomponent

    **Delivery Address**: {{ $prescription->delivery_address }}
    **Delivery Slot**: {{ $prescription->delivery_slot }}
    **Note**: {{ $prescription->note ?? 'N/A' }}

    You can review and respond to this quotation in your dashboard.

    @component('mail::button', ['url' => route('dashboard')])
        View Quotation
    @endcomponent

    Thank you,
    {{ config('app.name') }} Pharmacy Team
@endcomponent
