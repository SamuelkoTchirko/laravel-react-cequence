<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="This is a description of this awesome web application.">

    <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/512/1865/1865269.png">
    <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/1865/1865269.png">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Cequence') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>


    <!-- Fonts -->

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body>
  
    <div id="app"></div>
    <div id="modal"></div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
    <script src="https://unpkg.com/flowbite@1.5.3/dist/datepicker.js"></script>

</body>
</html>
