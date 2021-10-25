import jwt from 'jsonwebtoken';
import _ from 'lodash';

import {
  v4 as uuidv4
} from 'uuid';
const User = require('../model/userModel');
const nodemailer = require('nodemailer');
const expressJwt = require('express-jwt');

// đăng ký gửi from về email
export const registerControllers = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const users = new User({
    name,
    email,
    password,
    emailToken: uuidv4()
  });

  if (!users.email || !users.hashed_password || !users.name) {
    return res.status(400).json({
      error: false,
      message: 'register false'
    });
  }

  User.findOne({
    email: email
  }).exec((err, data) => {
    if (data) {
      return res.status(401).json({
        error: `${data.email} already exist!`
      })
    } else {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS
        }
      });

      let emailDetail = {
        from: `Verify your email ${process.env.EMAIL_FROM}`,
        to: users.email,
        subject: 'Verify your email',
        html: `
          <style type="text/css">
              @media screen {
                  @font-face {
                      font-family: 'Lato';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: normal;
                      font-weight: 700;
                      src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: italic;
                      font-weight: 400;
                      src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                  }
      
                  @font-face {
                      font-family: 'Lato';
                      font-style: italic;
                      font-weight: 700;
                      src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                  }
              }
      
              /* CLIENT-SPECIFIC STYLES */
              body,
              table,
              td,
              a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }
      
              table,
              td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }
      
              img {
                  -ms-interpolation-mode: bicubic;
              }
      
              /* RESET STYLES */
              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
              }
      
              table {
                  border-collapse: collapse !important;
              }
      
              body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
              }
      
              /* iOS BLUE LINKS */
              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }
      
              /* MOBILE STYLES */
              @media screen and (max-width:600px) {
                  h1 {
                      font-size: 32px !important;
                      line-height: 32px !important;
                  }
              }
      
              /* ANDROID CENTER FIX */
              div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
              }
          </style>
          <body
          style="
            background-color: #f4f4f4;
            margin: 0 !important;
            padding: 0 !important;
          "
        >
          <!-- HIDDEN PREHEADER TEXT -->
          <div
            style="
              display: none;
              font-size: 1px;
              color: #fefefe;
              line-height: 1px;
              font-family: 'Lato', Helvetica, Arial, sans-serif;
              max-height: 0px;
              max-width: 0px;
              opacity: 0;
              overflow: hidden;
            "
          >
            We're thrilled to have you here! Get ready to dive into your new account.
          </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- LOGO -->
            <tr>
              <td bgcolor="#00D9FF" align="center">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      align="center"
                      valign="top"
                      style="padding: 40px 10px 40px 10px"
                    ></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#00D9FF" align="center" style="padding: 0px 10px 0px 10px">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      valign="top"
                      style="
                        padding: 40px 20px 20px 20px;
                        border-radius: 4px 4px 0px 0px;
                        color: #111111;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 48px;
                        font-weight: 400;
                        letter-spacing: 4px;
                        line-height: 48px;
                      "
                    >
                      <h1 style="font-size: 48px; font-weight: 400; margin: 2">
                        Welcome!
                      </h1>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                        width="125"
                        height="120"
                        style="display: block; border: 0px"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style="
                        padding: 20px 30px 40px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      "
                    >
                      <p style="margin: 0">
                        We're excited to have you get started. First, you need to
                        confirm your account. Just press the button below.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="center"
                            style="padding: 20px 30px 60px 30px"
                          >
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  align="center"
                                  style="border-radius: 3px"
                                  bgcolor="#00D9FF"
                                >
                                  <a
                                    href="${process.env.ACTIVE}?token=${users.emailToken}"
                                    target="_blank"
                                    style="
                                      font-size: 20px;
                                      font-family: Helvetica, Arial, sans-serif;
                                      color: #ffffff;
                                      text-decoration: none;
                                      color: #ffffff;
                                      text-decoration: none;
                                      padding: 15px 25px;
                                      border-radius: 2px;
                                      border: 1px solid #00D9FF;
                                      display: inline-block;
                                    "
                                    >Confirm Account</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style="
                        padding: 0px 30px 0px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      "
                    >
                      <p style="margin: 0">
                        If that doesn't work, copy and paste the following link in
                        your browser:
                      </p>
                    </td>
                  </tr>
                  <!-- COPY -->
      
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style="
                        padding: 0px 30px 20px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      "
                    >
                      <p style="margin: 0">
                        If you have any questions, just reply to this email—we're
                        always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style="
                        padding: 0px 30px 40px 30px;
                        border-radius: 0px 0px 4px 4px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      "
                    >
                      <p style="margin: 0">Cheers,<br />Tran Anh Quang</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                bgcolor="#f4f4f4"
                align="center"
                style="padding: 30px 10px 0px 10px"
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      bgcolor="#FFECD1"
                      align="center"
                      style="
                        padding: 30px 30px 30px 30px;
                        border-radius: 4px 4px 4px 4px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      "
                    >
                      <h2
                        style="
                          font-size: 20px;
                          font-weight: 400;
                          color: #111111;
                          margin: 0;
                        "
                      >
                        Need more help?
                      </h2>
                      <p style="margin: 0">
                        <a href="#" target="_blank" style="color: #00D9FF"
                          >We&rsquo;re here to help you out</a
                        >
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="max-width: 600px"
                >
                  <tr>
                    <td
                      bgcolor="#f4f4f4"
                      align="left"
                      style="
                        padding: 0px 30px 30px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 18px;
                      "
                    >
                      <br />
                      <p style="margin: 0">
                        If these emails get annoying, please feel free to
                        <a
                          href="#"
                          target="_blank"
                          style="color: #111111; font-weight: 700"
                          >unsubscribe</a
                        >.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
          `
      }
      transporter.sendMail(emailDetail, async function (err) {
        if (err) {
          return res.status(401).json(err);
        }
        await users.save();
        res.json({
          emailToken: users.emailToken,
          message: 'Verification email is sent to your gmail account'
        })
      })
    }
  })


}

// xác thực kích hoạt email
export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    let user = await User.findOne({
      emailToken: token
    });

    if (user) {
      let dataNew = {
        emailToken: null,
        confirmed: true
      }
      dataNew = _.assignIn(user, dataNew);
      dataNew.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'active user failure'
          })
        }
        res.json(data);
      })
    } else {
      return res.status(403).json({
        error: "Email is not verified"
      })
    }
  } catch (error) {
    console.log(error);
  }
}
// kiểm tra trạng thái email đã kích hoạt hay chưa
export const verifyEmailCheck = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })
    // console.log(user);
    if (user.confirmed) {
      next();
    } else {
      return res.status(400).json({
        error: "Please check your email to verify your account"
      })
    }
  } catch (error) {
    // console.log(1);
    return res.status(401).json({
      error: "Please check user or password"
    })
  }
}

// đăng nhập, check  thông tin truyền vào
exports.signin = (req, res) => {
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email
  }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup"
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not match"
      })
    }
    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '36000s'
    });
    res.cookie('token', token, {
      expire: new Date() + 9999
    });
    const {
      _id,
      name,
      email,
      permission
    } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        permission
      }
    })
  })
}
// đăng xuất 
export const signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: "Singout succsessfully"
  });
}
// export const accountActivation = (req,res)=>{
//     console.log(req.body);
//     const {token} = req.body;
//     if(token){
//         jwt.verify(token, process.env.JWT_ACCOUNT_ACCTIVATION, function(err, decode){
//             if(err){
//                 return res.status(400).json({
//                     error:"Expired link. Signup again"
//                 })
//             }
//             const {name, email, hashed_password}= jwt.decode(token);
//             const user = new User({name, email, hashed_password});
//             user.save((error, user)=>{
//                 if(error){
//                     return res.status(400).json({
//                         error:"Cannot register account"
//                     })
//                 }
//                 user.salt = undefined;
//                 user.hashed_password= undefined;
//                 res.join({user})
//             })
//         }
//     }
// }



// export const signout = (req, res)=>{
//     res.clearCookie('user');
//     res.json({
//         message: "signout successfully"
//     })
// }

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

export const isAuth = (req, res, next) => {
  // console.log(req.profile);
  // console.log(req.auth);
  let user = req.profile && req.auth && req.profile._id === req.auth._id;
  // console.log(user);
  if (!user) {
    return res.status(403).json({
      error: "Access Denied"
    })
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.permission === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denined"
    })
  }
  next();
}

export const checkLoginWithGoogleAccount = (req, res, next) => {
  const {
    uid
  } = req.body;
  User.findOne({
    uid: uid
  }).exec((err, data) => {
    if (err) {
      return res.status(401).json({
        err
      });
    } else if (data == null) {
      req.googleAccount = req.body;
      next();
    } else {
      return res.json({
        data,
        message: 'Login with Google account successfully'
      });
    }
  })
}

export const loginWithGoogleAccount = (req, res) => {
  const user = new User(req.googleAccount);
  user.save((err, data) => {
    if (err) return res.status(401).json({
      err
    });
    res.json({
      data,
      message: 'Login first with Google account successfully'
    })
  })
}