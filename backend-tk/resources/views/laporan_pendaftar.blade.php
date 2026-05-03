<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan Pendaftar PPDB</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h2 {
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #333;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f3f4f6;
            text-transform: uppercase;
            font-size: 11px;
        }

        .text-center {
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>REKAPITULASI PENDAFTAR PPDB</h2>
        <p>TK Al-Ikhlash - Tanggal Cetak: {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th>No. Registrasi</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>Jalur</th>
                <th>Tgl Daftar</th>
                <th class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pendaftar as $index => $item)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $item->no_registrasi }}</td>
                    <td style="text-transform: uppercase;">{{ $item->nama_anak }}</td>
                    <td>{{ $item->jenis_kelamin }}</td>
                    <td>{{ $item->jenis_pendaftaran ?? $item->jalur_pendaftaran }}</td>
                    <td>{{ \Carbon\Carbon::parse($item->created_at)->format('d/m/Y') }}</td>
                    <td class="text-center">{{ $item->status }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>
