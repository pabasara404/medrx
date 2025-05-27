@component('mail::message')
    # Prescription Quotation

    Here’s your quotation:

    @foreach ($quotation->items as $item)
        - **{{ $item['drug'] }}** - {{ $item['quantity'] }} × {{ $item['unit_price'] }} = {{ $item['amount'] }}
    @endforeach

    **Total: {{ $quotation->total }}**

    @component('mail::button', ['url' => url('/user/quotations/' . $quotation->id)])
        View Quotation
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
