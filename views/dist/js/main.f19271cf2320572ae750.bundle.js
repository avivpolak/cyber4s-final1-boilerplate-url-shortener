(self.webpackChunkwebpack_boilerplate =
    self.webpackChunkwebpack_boilerplate || []).push([
    [179],
    {
        579: () => {
            function e(e, n) {
                var o =
                    ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
                if (!o) {
                    if (
                        Array.isArray(e) ||
                        (o = (function (e, n) {
                            if (e) {
                                if ("string" == typeof e) return t(e, n);
                                var o = Object.prototype.toString
                                    .call(e)
                                    .slice(8, -1);
                                return (
                                    "Object" === o &&
                                        e.constructor &&
                                        (o = e.constructor.name),
                                    "Map" === o || "Set" === o
                                        ? Array.from(e)
                                        : "Arguments" === o ||
                                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                              o
                                          )
                                        ? t(e, n)
                                        : void 0
                                );
                            }
                        })(e)) ||
                        (n && e && "number" == typeof e.length)
                    ) {
                        o && (e = o);
                        var a = 0,
                            r = function () {};
                        return {
                            s: r,
                            n: function () {
                                return a >= e.length
                                    ? { done: !0 }
                                    : { done: !1, value: e[a++] };
                            },
                            e: function (e) {
                                throw e;
                            },
                            f: r,
                        };
                    }
                    throw new TypeError(
                        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                    );
                }
                var l,
                    c = !0,
                    d = !1;
                return {
                    s: function () {
                        o = o.call(e);
                    },
                    n: function () {
                        var e = o.next();
                        return (c = e.done), e;
                    },
                    e: function (e) {
                        (d = !0), (l = e);
                    },
                    f: function () {
                        try {
                            c || null == o.return || o.return();
                        } finally {
                            if (d) throw l;
                        }
                    },
                };
            }
            function t(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
                return o;
            }
            document
                .getElementById("submit")
                .addEventListener("click", function () {
                    var e;
                    (document.getElementById("error").innerText = ""),
                        document.getElementById("url").value,
                        (e = {
                            url: document.getElementById("url").value,
                            name: localStorage.name,
                        }),
                        axios
                            .post(
                                "http://localhost:".concat(n, "/new"),
                                "data",
                                { headers: e }
                            )
                            .then(function (e) {
                                document.getElementById("url").value = e.data;
                            })
                            .catch(function (e) {
                                e.response &&
                                    (document.getElementById(
                                        "error"
                                    ).innerText = e.response.data);
                            });
                }),
                document
                    .getElementById("copy")
                    .addEventListener("click", function () {
                        var e = document.getElementById("url").value;
                        navigator.clipboard.writeText(e).then(
                            function () {
                                console.log(
                                    "Async: Copying to clipboard was successful!"
                                );
                            },
                            function (e) {
                                console.error(
                                    "Async: Could not copy text: ",
                                    e
                                );
                            }
                        );
                    }),
                document
                    .getElementById("clear")
                    .addEventListener("click", function () {
                        document.getElementById("url").value = "";
                    }),
                document
                    .getElementById("register")
                    .addEventListener("click", function () {
                        document.getElementById("registerStatus").innerText =
                            "";
                        var e = {
                            username: document.getElementById("userName").value,
                            password:
                                document.getElementById("userPassword").value,
                        };
                        axios
                            .post(
                                "http://localhost:".concat(n, "/users/new"),
                                "data",
                                { headers: e }
                            )
                            .then(function (e) {
                                var t = "welome "
                                    .concat(
                                        e.data.userName,
                                        ', your password is  "'
                                    )
                                    .concat(e.data.password, '"');
                                document.getElementById(
                                    "registerStatus"
                                ).innerText = t;
                            })
                            .catch(function (e) {
                                e.response &&
                                    (document.getElementById(
                                        "registerStatus"
                                    ).innerText = e.response.data);
                            });
                    }),
                document
                    .getElementById("login")
                    .addEventListener("click", function () {
                        document.getElementById("loginStatus").innerText = "";
                        var e = {
                            username: document.getElementById("name").value,
                            password: document.getElementById("password").value,
                        };
                        axios
                            .put(
                                "http://localhost:".concat(n, "/login"),
                                "data",
                                { headers: e }
                            )
                            .then(function (e) {
                                (localStorage.name = e.data.name),
                                    (localStorage.password = e.data.password),
                                    a(
                                        e.data.name,
                                        document.getElementById("password")
                                            .value
                                    ),
                                    o(localStorage.name);
                            })
                            .catch(function (e) {
                                e.response &&
                                    (document.getElementById(
                                        "loginStatus"
                                    ).innerText = e.response.data);
                            });
                    }),
                document
                    .getElementById("logout")
                    .addEventListener("click", function () {
                        localStorage.clear(), location.reload();
                    });
            var n = 1042;
            function o(e) {
                (document.getElementById("greetins").innerText =
                    "welcome ".concat(e)),
                    document
                        .getElementById("loginSection")
                        .classList.toggle("hide"),
                    document
                        .getElementById("registerSection")
                        .classList.toggle("hide"),
                    document.getElementById("footer").classList.toggle("hide"),
                    document.getElementById("logout").classList.toggle("hide"),
                    a(localStorage.name, localStorage.password);
            }
            function a(t, o) {
                document.getElementById("myArea").innerHTML = "";
                var a = { username: t, password: o };
                axios
                    .put(
                        "http://localhost:".concat(n, "/users/").concat(t),
                        "data",
                        { headers: a }
                    )
                    .then(function (t) {
                        document.getElementById("myArea").append(
                            (function (t) {
                                var n = r("table"),
                                    o = r("td", ["shoutened url"]),
                                    a = r("td", ["long url"]),
                                    l = r("td", ["Times Visited"]),
                                    c = r("thead", [o, a, l]);
                                n.append(c);
                                var d,
                                    u = e(t);
                                try {
                                    for (u.s(); !(d = u.n()).done; ) {
                                        var s,
                                            i = d.value,
                                            m = r("tr"),
                                            g = e(i);
                                        try {
                                            for (g.s(); !(s = g.n()).done; ) {
                                                var y = r("td", [s.value]);
                                                m.append(y);
                                            }
                                        } catch (e) {
                                            g.e(e);
                                        } finally {
                                            g.f();
                                        }
                                        n.append(m);
                                    }
                                } catch (e) {
                                    u.e(e);
                                } finally {
                                    u.f();
                                }
                                return n;
                            })(t.data)
                        );
                    });
            }
            function r(t) {
                var n,
                    o =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : [],
                    a =
                        arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : [],
                    r = arguments.length > 3 ? arguments[3] : void 0,
                    l = arguments.length > 4 ? arguments[4] : void 0,
                    c = document.createElement(t),
                    d = e(o);
                try {
                    for (d.s(); !(n = d.n()).done; ) {
                        var u = n.value;
                        ("string" != typeof u && "number" != typeof u) ||
                            (u = document.createTextNode(u)),
                            c.appendChild(u);
                    }
                } catch (e) {
                    d.e(e);
                } finally {
                    d.f();
                }
                var s,
                    i = e(a);
                try {
                    for (i.s(); !(s = i.n()).done; ) {
                        var m = s.value;
                        c.classList.add(m);
                    }
                } catch (e) {
                    i.e(e);
                } finally {
                    i.f();
                }
                for (var g in r) c.setAttribute(g, r[g]);
                for (var y in l) c.addEventListener(y, l[y]);
                return c;
            }
            localStorage.name && o(localStorage.name);
        },
    },
    (e) => {
        e((e.s = 579));
    },
]);
