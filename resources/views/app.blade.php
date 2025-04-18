<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Mauricio Tellez">
    <meta name="keywords" content="lotería, comprar lotería, resultados lotería, premios lotería, jjugar loteria, ganar lotería, sorteos, TePagodeUna">
    <meta name="description" content="Con solo 2$ puedes ganar hasta 700$ en premios en 16 sorteos diarios. ¡Más sorteos, más oportunidades de ganar! ¿Qué esperas? Dale a COMPRAR y participa, porque aquí no esperas... ¡Aquí te pago de una!">
    <meta name="robots" content="index, follow">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    <!-- Meta Pixel Code 
    <script>
        ! function(f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function() {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1577126926269609');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1577126926269609&ev=PageView&noscript=1" /></noscript>
    --><!-- End Meta Pixel Code -->



</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>