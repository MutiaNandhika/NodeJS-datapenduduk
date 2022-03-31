var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET warga page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM tbl_warga",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("warga/list", {
          title: "Wargas",
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
      var warga = {
        id: req.params.id,
      };

      var delete_sql = "delete from tbl_warga where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(delete_sql, warga, function (err, result) {
          if (err) {
            var errors_detail = ("Error Delete : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/wargas");
          } else {
            req.flash("msg_info", "Delete Data Warga Success");
            res.redirect("/wargas");
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
        "SELECT * FROM tbl_warga where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/wargas");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "warga can't be find!");
              res.redirect("/wargas");
            } else {
              console.log(rows);
              res.render("warga/edit", {
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
    req.assert("nik_warga", "Please fill the nik_warga").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_nik_warga = req.sanitize("nik_warga").escape().trim();
      v_nama_warga = req.sanitize("nama_warga").escape().trim();
      v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
      v_usia = req.sanitize("usia").escape();
      v_pendidikan = req.sanitize("pendidikan").escape().trim();
      v_pekerjaan = req.sanitize("pekerjaan").escape().trim();
      v_kawin = req.sanitize("kawin").escape().trim();
      v_status = req.sanitize("status").escape();

      var warga = {
        nik_warga: v_nik_warga,
        nama_warga: v_nama_warga,
        jenis_kelamin: v_jenis_kelamin,
        usia: v_usia,
        pendidikan: v_pendidikan,
        pekerjaan: v_pekerjaan,
        kawin: v_kawin,
        status: v_status,
      };

      var update_sql = "update tbl_warga SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(update_sql, warga, function (err, result) {
          if (err) {
            var errors_detail = ("Error Update : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("warga/edit", {
              nik_warga: req.param("nik_warga"),
              nama_warga: req.param("nama_warga"),
              jenis_kelamin: req.param("jenis_kelamin"),
              usia: req.param("usia"),
              pendidikan: req.param("pendidikan"),
              pekerjaan: req.param("pekerjaan"),
              kawin: req.param("kawin"),
              status: req.param("status"),
            });
          } else {
            req.flash("msg_info", "Update Data Warga success");
            res.redirect("/wargas/edit/" + req.params.id);
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
      res.redirect("/wargas/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("nik_warga", "Please fill the nik_warga").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_nik_warga = req.sanitize("nik_warga").escape();
    v_nama_warga = req.sanitize("nama_warga").escape().trim();
    v_jenis_kelamin = req.sanitize("jenis_kelamin").escape().trim();
    v_usia = req.sanitize("usia").escape();
    v_pendidikan = req.sanitize("pendidikan").escape().trim();
    v_pekerjaan = req.sanitize("pekerjaan").escape().trim();
    v_kawin = req.sanitize("kawin").escape().trim();
    v_status = req.sanitize("status").escape().trim();

    var warga = {
      nik_warga: v_nik_warga,
      nama_warga: v_nama_warga,
      jenis_kelamin: v_jenis_kelamin,
      usia: v_usia,
      pendidikan: v_pendidikan,
      pekerjaan: v_pekerjaan,
      kawin: v_kawin,
      status: v_status,
    };

    var insert_sql = "INSERT INTO tbl_warga SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(insert_sql, warga, function (err, result) {
        if (err) {
          var errors_detail = ("Error Insert : %s ", err);
          req.flash("msg_error", errors_detail);
          res.render("warga/add-warga", {
            nik_warga: req.param("nik_warga"),
            nama_warga: req.param("nama_warga"),
            jenis_kelamin: req.param("jenis_kelamin"),
            usia: req.param("usia"),
            pendidikan: req.param("pendidikan"),
            pekerjaan: req.param("pekerjaan"),
            kawin: req.param("kawin"),
            status: req.param("status"),
            session_store: req.session,
          });
        } else {
          req.flash("msg_info", "Create Data Warga success");
          res.redirect("/wargas");
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
    res.render("warga/add-warga", {
      nik_warga: req.param("nik_warga"),
      nama_warga: req.param("nama_warga"),
      jenis_kelamin: req.param("jenis_kelamin"),
      usia: req.param("usia"),
      pendidikan: req.param("pendidikan"),
      pekerjaan: req.param("pekerjaan"),
      kawin: req.param("kawin"),
      status: req.param("status"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("warga/add-warga", {
    title: "Add New warga",
    nik_warga: "",
    nama_warga: "",
    jenis_kelamin: "",
    usia: "",
    pendidikan: "",
    pekerjaan: "",
    kawin: "",
    status: "",
    session_store: req.session,
  });
});

module.exports = router;
