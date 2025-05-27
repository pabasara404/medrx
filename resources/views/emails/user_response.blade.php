@component('mail::message')
    # Quotation {{ ucfirst($response) }}

    The user has **{{ $response }}** your quotation for prescription #{{ $quotation->prescription_id }}.

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
