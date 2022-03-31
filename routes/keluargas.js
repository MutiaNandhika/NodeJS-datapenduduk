var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET keluarga page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM tbl_keluarga",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("keluarga/list", {
          title: "keluargas",
          data: rows,
          session_store: req.session,
        });
      }
    );
    //console.log(query.sql);
  });
});

router.delete(
  "/delete/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var keluarga = {
        id: req.params.id,
      };

      var delete_sql = "delete from tbl_keluarga where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(delete_sql, keluarga, function (err, result) {
          if (err) {
            var errors_detail = ("Error Delete : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/keluargas");
          } else {
            req.flash("msg_info", "Delete Data KK Success");
            res.redirect("/keluargas");
          }
        });
      });
    });
  }
);
router.get(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var query = connection.query(
        "SELECT * FROM tbl_keluarga where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/keluargas");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "keluarga can't be find!");
              res.redirect("/keluargas");
            } else {
              console.log(rows);
              res.render("keluarga/edit", {
                title: "Edit ",
                data: rows[0],
                session_store: req.session,
              });
            }
          }
        }
      );
    });
  }
);
router.put(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.assert("nik_kep", "Please fill the nik_kep").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_nokk = req.sanitize("nokk").escape().trim();
      v_nama_kep = req.sanitize("nama_kep").escape().trim();
      v_nik_kep = req.sanitize("nik_kep").escape().trim();
      v_jumlah = req.sanitize("jumlah").escape();
      v_alamat = req.sanitize("alamat").escape().trim();
      v_rt = req.sanitize("rt").escape();
      v_rw = req.sanitize("rw").escape();

      var keluarga = {
        nokk : v_nokk,
        nama_kep : v_nama_kep,
        nik_kep : v_nik_kep,
        jumlah : v_jumlah,
        alamat : v_alamat,
        rt : v_rt,
        rw : v_rw
      };

      var update_sql = "update tbl_keluarga SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(update_sql, keluarga, function (err, result) {
          if (err) {
            var errors_detail = ("Error Update : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("keluarga/edit", {
              nokk: req.param("nokk"),
              nama_kep: req.param("nama_kep"),
              nik_kep: req.param("nik_kep"),
              jumlah : req.param("jumlah"),
              alamat : req.param("alamat"),
              rt : req.param("rt"),
              rw : req.param("rw"),
            });
          } else {
            req.flash("msg_info", "Update KK success");
            res.redirect("/keluargas/edit/" + req.params.id);
          }
        });
      });
    } else {
      console.log(errors);
      errors_detail = "<p>Sory there are error</p><ul>";
      for (i in errors) {
        error = errors[i];
        errors_detail += "<li>" + error.msg + "</li>";
      }
      errors_detail += "</ul>";
      req.flash("msg_error", errors_detail);
      res.redirect("/keluargas/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("nik_kep", "Please fill the nik_kep").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_nokk = req.sanitize("nokk").escape().trim();
    v_nama_kep = req.sanitize("nama_kep").escape().trim();
    v_nik_kep = req.sanitize("nik_kep").escape().trim();
    v_jumlah = req.sanitize("jumlah").escape();
    v_alamat = req.sanitize("alamat").escape().trim();
    v_rt = req.sanitize("rt").escape();
    v_rw = req.sanitize("rw").escape();

    var keluarga = {
      nokk: v_nokk,
      nama_kep: v_nama_kep,
      nik_kep: v_nik_kep,
      jumlah: v_jumlah,
      alamat: v_alamat,
      rt: v_rt,
      rw: v_rw,
    };

    var insert_sql = "INSERT INTO tbl_keluarga SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(insert_sql, keluarga, function (err, result) {
        if (err) {
          var errors_detail = ("Error Insert : %s ", err);
          req.flash("msg_error", errors_detail);
          res.render("keluarga/add-kk", {
            nokk: req.param("nokk"),
            nama_kep: req.param("nama_kep"),
            nik_kep: req.param("nik_kep"),
            jumlah: req.param("jumlah"),
            alamat: req.param("alamat"),
            rt: req.param("rt"),
            rw: req.param("rw"),
          });
        } else {
          req.flash("msg_info", "Create KK success");
          res.redirect("/keluargas");
        }
      });
    });
  } else {
    console.log(errors);
    errors_detail = "<p>Sory there are error</p><ul>";
    for (i in errors) {
      error = errors[i];
      errors_detail += "<li>" + error.msg + "</li>";
    }
    errors_detail += "</ul>";
    req.flash("msg_error", errors_detail);
    res.render("keluarga/add-kk", {
      nokk: req.param("nokk"),
      nama_kep: req.param("nama_kep"),
      nik_kep: req.param("nik_kep"),
      jumlah: req.param("jumlah"),
      alamat: req.param("alamat"),
      rt: req.param("rt"),
      rw: req.param("rw"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("keluarga/add-kk", {
    title: "Add New keluarga",
    nokk: "",
    nama_kep: "",
    nik_kep: "",
    jumlah: "",
    alamat: "",
    rt: "",
    rw: "",
    session_store: req.session,
  });
});

module.exports = router;
