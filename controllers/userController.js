const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) return res.status(400).send('User tidak ditemukan!');

        if (req.body.password) {
            const newPassHash = await bcrypt.hash(req.body.password, 10);
            user.password = newPassHash || user.password;
            user.no_telepon = req.body.no_telepon || user.no_telepon;
            user.alamat = req.body.alamat || user.alamat;
        } else {
            user.password = req.body.password || user.password;
            user.no_telepon = req.body.no_telepon || user.no_telepon;
            user.alamat = req.body.alamat || user.alamat;
        }


        await user.save();

        return res.status(200).send(`Data user ${user.nama} berhasil diupdate!`);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Gagal mengubah data user!');
    }
}

exports.addUser = async (req, res) => {
    try {
        const { nama, no_telepon, alamat, email, password } = req.body;
        const passHash = await bcrypt.hash(password, 10);

        const userBaru = await User.create({
            nama,
            no_telepon,
            alamat,
            email,
            password: passHash
        });

        res.status(201).json({
            message: 'User berhasil ditambahkan!',
            data: userBaru
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan');
    } 
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.destroy({where: {id}});
        if (!user) return res.status(400).send('User tidak ditemukan.');
    
        return res.status(200).send('User berhasil dihapus.');

    } catch (err) {
        console.error(err);
        res.status(500).send('Terjadi kesalahan.');
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) return res.status(400).send('User kosong.');

        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Terjadi kesalahan.');
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (!user) return res.status(400).send('User tidak ditemukan.');

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Terjadi kesalahan.');
    }
}

exports.getUserByToken = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findByPk(id, {
      attributes: ['id', 'nama', 'alamat', 'no_telepon', 'email']
    });

    if (!user) return res.status(404).send('User tidak ditemukan.');

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Terjadi kesalahan.');
  }
};

exports.updateUserByToken = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).send('User tidak ditemukan!');

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    user.no_telepon = req.body.no_telepon || user.no_telepon;
    user.alamat = req.body.alamat || user.alamat;

    await user.save();

    return res.status(200).send(`Data user ${user.nama} berhasil diupdate!`);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Gagal mengubah data user!');
  }
};
