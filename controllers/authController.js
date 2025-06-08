// const { where } = require('sequelize');
// const { User } = require('../models');
// const bcrypt = require('bcryptjs');
// // const sequelize = require('sequelize')

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({where:  {email} })

//         if (!user) return res.status(404).json({
//             "success": false,
//             "message": "Email tidak ditemukan"
//         });

//         const valid = await bcrypt.compare(password, user.password);
    
//         if (valid){
//             return res.status(200).json({
//                 "success": true,
//                 "message":"Berhasil login"
//             });
//         } else {
//             return res.status(401).json({
//                 "success": false,
//                 "message":"Password salah"
//             });
//         }
        
//     } catch (error) {
//         console.error("Login error: ", error);
//         return res.status(500).send('Terjadi kesalahan pada server');
//     }

// }

const { where } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const sequelize = require('sequelize')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where:  {email} })

        if (!user) return res.status(404).json({
            "success": false,
            "message": "Email tidak ditemukan"
        });

        const valid = await bcrypt.compare(password, user.password);
    
        if (valid){
            // const token = jwt.sign({ email: user.email, userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // return res.status(200).json({ token });
            const token = jwt.sign(
                { email: user.email, userId: user.id, nama: user.nama },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                success: true,
                message: "Berhasil login",
                token,
                user: {
                id: user.id,
                nama: user.nama,
                email: user.email
                }
            });
        } else {
            return res.status(401).json({
                "success": false,
                "message":"Password salah"
            });
        }
        
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).send('Terjadi kesalahan pada server');
    }

}