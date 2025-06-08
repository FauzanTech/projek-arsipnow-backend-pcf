const { suratKeluar } = require('../models');
const fs = require('fs');
const { Op } = require('sequelize');
const path = require("path");

exports.uploadSurat = async (req, res) => {
    try {
        const { no_surat, tgl_surat, tujuan, perihal, penandatangan } = req.body;
        const file = req.file;

        if (!file) return res.status(400).send('File harus diupload!');

        const suratBaru = await suratKeluar.create({
            no_surat,
            tgl_surat,
            tujuan,
            perihal,
            penandatangan,
            file_surat: file.path
        });

        res.status(201).json({
            message: 'Surat berhasil diupload',
            data: suratBaru
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menyimpan surat!');
    }
}

exports.getSurat = async (req, res) => {
    try {
        const id = req.params.id;
        const surat = await suratKeluar.findByPk(id);

        if (!surat) return res.status(400).send('Surat tidak ditemukan!');
        
        res.status(200).json(surat);

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server!');
    }
}

// exports.getAll = async (req, res) => {
//     try {
//         const surat = await suratKeluar.findAll();
        
//         if (!surat) return res.status(400).send('Surat kosong!');
        
//         res.status(200).json(surat);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Terjadi kesalahan pada server!');
//     }
// }

exports.getAll = async (req, res) => {
  try {
    const surat = await suratKeluar.findAll();

    if (!surat || surat.length === 0) 
      return res.status(400).send('Surat kosong!');

    // Modifikasi setiap item agar file_surat hanya nama filenya
    const modifiedSurat = surat.map(item => {
      return {
        ...item.dataValues, // ambil dataValues dari Sequelize instance
        file_surat: path.basename(item.file_surat)
      };
    });

    res.status(200).json(modifiedSurat);

  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan pada server!');
  }
};

exports.updateSurat = async (req, res) => {
    try {
        const id = req.params.id;
        const surat = await suratKeluar.findByPk(id);
        if (!surat) return res.status(400).send('Surat tidak ditemukan!');

        if (req.file) {
            if (surat.file_surat && fs.existsSync(surat.file_surat)) {
                fs.unlinkSync(surat.file_surat);
            };

            surat.file_surat = req.file.path;
        };

        surat.no_surat = req.body.no_surat || surat.no_surat;
        surat.tgl_diterima = req.body.tgl_diterima || surat.tgl_diterima;
        surat.tujuan = req.body.tujuan || surat.tujuan;
        surat.perihal = req.body.perihal || surat.perihal;
        surat.penandatangan = req.body.penandatangan || surat.penandatangan;

        await surat.save();

        return res.status(200).json({message:'Surat berhasil diupdate!', data: surat});

    } catch (error) {
        console.error(error);
        res.status(500).send('Surat gagal diperbarui!');
    }
}

exports.deleteSurat = async (req, res) => {
    try {
        const id = req.params.id;
        const surat = await suratKeluar.findByPk(id);
        if (!surat) return res.status(400).send('Surat tidak ditemukan')
        fs.unlinkSync(surat.file_surat);

        suratKeluar.destroy({where: { id }});

        return res.status(200).send('Surat berhasil dihapus!'); 

    } catch (error) {
        console.error(error);
        return res.status(500).send('Surat gagal dihapus!');
    }
    
}

exports.cariSurat = async (req, res) => {
    try {
        const keyword = req.query.cari || '';
        const tanggal = req.query.tanggal;

        const kondisi = {
            [Op.or]: [
                {no_surat : { [Op.like]: `%${keyword}%` }},
                {perihal : { [Op.like]: `%${keyword}%` }},
                {tujuan : { [Op.like]: `%${keyword}%` }},
                {penandatangan : { [Op.like]: `%${keyword}%` }}
            ]
        };

        if (tanggal) {
            const awal = new Date(`${tanggal}T00:00:00`);
            const akhir = new Date(`${tanggal}T23:59:59`);
            kondisi.tgl_surat = {
                [Op.between]: [awal, akhir]
            };
        };

        const hasil = await suratKeluar.findAll({where: kondisi, order: [['createdAt', 'DESC']]});

        res.status(200).json(hasil);

    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal mencari surat.')
    }
}

exports.countSurat = async (req, res) => {
  try {
    const count = await suratKeluar.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghitung surat masuk.' });
  }
};

