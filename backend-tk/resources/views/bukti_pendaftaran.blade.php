<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Bukti Pendaftaran - {{ $pendaftaran->no_registrasi }}</title>
    <style>
        body {
            font-family: 'Helvetica', sans-serif;
            font-size: 13px;
            color: #333;
            line-height: 1.5;
        }

        .header {
            border-bottom: 3px solid #15803d;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .logo {
            width: 70px;
            float: left;
        }

        .school-info {
            text-align: center;
            margin-left: 70px;
        }

        .school-info h1 {
            margin: 0;
            color: #15803d;
            font-size: 20px;
            text-transform: uppercase;
        }

        .school-info p {
            margin: 2px 0;
            font-size: 11px;
            color: #555;
        }

        .title {
            text-align: center;
            text-decoration: underline;
            text-transform: uppercase;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
        }

        .content {
            margin-top: 20px;
            position: relative;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table td {
            padding: 5px 0;
            vertical-align: top;
        }

        .label {
            width: 35%;
            font-weight: bold;
        }

        .separator {
            width: 3%;
        }

        /* Foto Murid di pojok kanan atas content */
        .foto-murid {
            float: right;
            width: 100px;
            height: 130px;
            border: 1px solid #ccc;
            padding: 2px;
            background: #fff;
        }

        .footer-note {
            margin-top: 30px;
            background: #fdf6e3;
            padding: 15px;
            border: 1px solid #eee8d5;
            border-radius: 5px;
        }

        .footer-note strong {
            color: #b58900;
            display: block;
            margin-bottom: 5px;
        }

        .footer-note ul {
            margin: 0;
            padding-left: 20px;
            font-size: 11px;
        }

        .clearfix {
            clear: both;
        }

        .signature {
            margin-top: 40px;
            float: right;
            text-align: center;
            width: 200px;
        }
    </style>
</head>

<body>
    {{-- KOP SURAT --}}
    <table width="100%" style="border-bottom: 3px solid #15803d; padding-bottom: 10px;">
        <tr>
            <td width="15%" align="left">
                @if ($logo)
                    <img src="{{ $logo }}" style="width: 80px;">
                @endif
            </td>
            <td width="70%" align="center">
                <h1 style="margin: 0; color: #15803d; font-size: 22px; text-transform: uppercase;">
                    TK Al-Ikhlash Jepara
                </h1>
                <p style="margin: 2px 0; font-size: 11px; color: #555;">
                    Jl. Raya Jepara-Bangsri KM 07, Mlonggo, Kabupaten Jepara, Jawa Tengah.
                </p>
                <p style="margin: 2px 0; font-size: 11px; color: #555;">
                    Email: info@tkalikhlasjepara.sch.id | Website: www.tkalikhlasjepara.sch.id
                </p>
            </td>
            <td width="15%"></td>
        </tr>
    </table>

    <div class="title"
        style="text-align: center; font-weight: bold; font-size: 16px; margin: 20px 0; text-transform: uppercase; color: #333;">
        Bukti Pendaftaran Siswa Baru
    </div>

    <div class="content" style="position: relative;">
        {{-- PAS FOTO --}}
        <div style="position: absolute; right: 0; top: 0;">
            @if ($foto)
                <img src="{{ $foto }}"
                    style="width: 113px; height: 151px; border: 1px solid #ccc; padding: 2px; object-fit: cover;">
            @else
                <div
                    style="width: 113px; height: 151px; border: 1px solid #ddd; text-align: center; line-height: 151px; font-size: 10px; color: #999;">
                    Pas Foto 3x4</div>
            @endif
        </div>

        {{-- KELOMPOK 1: IDENTITAS & PENDAFTARAN --}}
        <h3 style="font-size: 12px; color: #15803d; border-bottom: 1px solid #eee; padding-bottom: 5px;">I. INFORMASI
            PENDAFTARAN & IDENTITAS</h3>
        <table class="table" style="width: 78%; font-size: 11px; margin-bottom: 15px;">
            <tr>
                <td width="35%">No. Registrasi</td>
                <td width="5%">:</td>
                <td style="font-weight: bold; color: #15803d;">{{ $pendaftaran->no_registrasi }}</td>
            </tr>
            <tr>
                <td>Kategori Siswa</td>
                <td>:</td>
                <td style="text-transform: uppercase; font-weight: bold;">{{ $pendaftaran->kategori_siswa }}</td>
            </tr>
            <tr>
                <td>Jalur Pendaftaran</td>
                <td>:</td>
                <td>{{ $pendaftaran->jenis_pendaftaran }}</td>
            </tr>
            <tr>
                <td>Nama Lengkap</td>
                <td>:</td>
                <td style="text-transform: uppercase;">{{ $pendaftaran->nama_anak }}</td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>{{ str_contains(strtoupper($pendaftaran->jenis_kelamin), 'LAKI') ? 'Laki-laki' : 'Perempuan' }}</td>
            </tr>
            <tr>
                <td>NIK Anak</td>
                <td>:</td>
                <td>{{ $pendaftaran->nik_anak }}</td>
            </tr>
            <tr>
                <td>No. Akta Kelahiran</td>
                <td>:</td>
                <td>{{ $pendaftaran->no_akta ?? '-' }}</td>
            </tr>
            <tr>
                <td>Tempat, Tgl Lahir</td>
                <td>:</td>
                <td>{{ $pendaftaran->tempat_lahir }},
                    {{ \Carbon\Carbon::parse($pendaftaran->tanggal_lahir)->translatedFormat('d F Y') }}</td>
            </tr>
            <tr>
                <td>Kewarganegaraan</td>
                <td>:</td>
                <td>{{ $pendaftaran->kewarganegaraan }}</td>
            </tr>
        </table>

        {{-- KELOMPOK 2: DATA FISIK & KESEHATAN --}}
        <h3 style="font-size: 12px; color: #15803d; border-bottom: 1px solid #eee; padding-bottom: 5px;">II. DATA
            KESEHATAN & FISIK</h3>
        <table width="100%" style="font-size: 11px; margin-bottom: 15px;">
            <tr>
                <td width="20%">Berat Badan</td>
                <td width="30%">: {{ $pendaftaran->berat_badan }} kg</td>
                <td width="20%">Tinggi Badan</td>
                <td width="30%">: {{ $pendaftaran->tinggi_badan }} cm</td>
            </tr>
            <tr>
                <td>Lingkar Kepala</td>
                <td>: {{ $pendaftaran->lingkar_kepala }} cm</td>
                <td>Jarak ke Sekolah</td>
                <td>: {{ $pendaftaran->jarak_rumah }} km</td>
            </tr>
        </table>

        {{-- KELOMPOK 3: DATA TAMBAHAN & KONTAK --}}
        <h3 style="font-size: 12px; color: #15803d; border-bottom: 1px solid #eee; padding-bottom: 5px;">III. DATA
            TAMBAHAN & ALAMAT</h3>
        <table width="100%" style="font-size: 11px;">
            <tr>
                <td width="27%">Anak Ke-</td>
                <td width="5%">:</td>
                <td>{{ $pendaftaran->anak_ke }}</td>
            </tr>
            <tr>
                <td>Bahasa Sehari-hari</td>
                <td>:</td>
                <td>{{ $pendaftaran->bahasa }}</td>
            </tr>
            <tr>
                <td>Hobi / Cita-cita</td>
                <td>:</td>
                <td>{{ $pendaftaran->hobi }} / {{ $pendaftaran->cita_cita }}</td>
            </tr>
            <tr>
                <td>Email Orang Tua</td>
                <td>:</td>
                <td>{{ $pendaftaran->email }}</td>
            </tr>
            <tr>
                <td style="vertical-align: top;">Alamat Domisili</td>
                <td style="vertical-align: top;">:</td>
                <td>{{ $pendaftaran->alamat }}</td>
            </tr>
        </table>
    </div>

    <div class="footer-note"
        style="margin-top: 25px; font-size: 10px; border: 1px dashed #ccc; padding: 10px; background-color: #fafafa;">
        <strong style="color: #d97706;">PENTING: Kelengkapan Berkas Verifikasi</strong>
        <p style="margin: 5px 0;">Mohon membawa dokumen asli dan fotocopy Kartu Keluarga, Akta Kelahiran, serta cetak
            bukti ini saat tahap verifikasi di sekolah.</p>
    </div>

    <table width="100%" style="margin-top: 30px; font-size: 11px;">
        <tr>
            <td width="60%"></td>
            <td align="center">
                Jepara, {{ date('d F Y') }}<br>
                Panitia PPDB TK Al-Ikhlash
                <br><br><br><br>
                <strong>( __________________________ )</strong>
            </td>
        </tr>
    </table>
</body>

</html>
