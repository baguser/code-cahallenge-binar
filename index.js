const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const path = require("path");
const app = express();
const port = 8000;
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// let users = require("./users.json");

// memanggil file ejs

app.get("/game.ejs", (req, res) => {
  res.render("game.ejs");
});
app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/admin_login", function (req, res) {
  res.render("admin_login.ejs");
  console.log("User login");
});

app.get("/dasboard.ejs", function (req, res) {
  const contacts = loadContact();
  res.render("dasboard.ejs", {
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/add_user.ejs", function (req, res) {
  res.render("add_user.ejs");
});

// login
app.get("/admin_in", function (req, res) {
  var Name = req.query.name;
  var Password = req.query.pass;
  //console.log(Name);

  if (Password == "123") {
    const customer = [{ id: "1", name: "admin", pass: "123" }];
    console.log("Successfully logged ");
    res.render("dasboard.ejs", {
      customer: customer,
    });
  } else {
    res.render("notfound.ejs");
  }
});

// proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      //value mengambil dari contacts.js
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("nama contact sudah digunakan");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("nohp", "nomer hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add_user", {
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      //kirimkan flash message
      req.flash("msg", "data contact berhasil ditambahkan!");
      res.redirect("/dasboard.ejs");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    //kirimkan flash message
    req.flash("msg", "data contact berhasil dihapus!");
    res.redirect("/dasboard.ejs");
  }
});

// memanggil halaman form ubah data contact
app.get("/contact/edit/:nama", function (req, res) {
  const contact = findContact(req.params.nama);

  res.render("edit_user", {
    contact,
  });
});

// proses ubah data
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      //value mengambil dari contacts.js
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("nama contact sudah digunakan");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("nohp", "nomer hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit_user", {
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      //kirimkan flash message
      req.flash("msg", "data contact berhasil ditambahkan!");
      res.redirect("/dasboard.ejs");
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

module.exports.app = app;

app.listen(port, () => console.log(`buka di http://localhost:${port}`));
