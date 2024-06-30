import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useCookies } from "react-cookie";

import { URI } from "./uri";
import { AppContext } from "./AppContext";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import NoLoginMenu from "./Layouts/NoLoginMenu";
import NoLoginPages from "./Layouts/NoLoginPages";
import AdminMenu from "./Layouts/AdminMenu";
import AdminPages from "./Layouts/AdminPages";
import UserMenu from "./Layouts/UserMenu";
import UserPages from "./Layouts/UserPages";

import "./app.css";

function App() {
  const [cookie, ,] = useCookies("token");
  const [isLogged, setIsLogged] = useState(false);
  const [me, setMe] = useState({});

  useEffect(() => {
    if (cookie.token !== undefined) {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + cookie.token },
      };
      fetch(URI + "/auth", options)
        .then((resposne) => resposne.json())
        .then((response) => {
          if (response.status === "OK") {
            setMe(response.response);
            setIsLogged(true);
          }
        });
    }
  }, [cookie.token]);

  const { isAdmin } = me;
  return (
    <BrowserRouter>
      <AppContext.Provider value={me}>
        <div className="main">
          <Header />
          <main>
            {isLogged ? (
              <>
                {isAdmin ? (
                  <>
                    <nav>
                      <AdminMenu me={me} />
                    </nav>
                    <section>
                      <AdminPages me={me} />
                    </section>
                  </>
                ) : (
                  <>
                    <nav>
                      <UserMenu me={me} />
                    </nav>
                    <section>
                      <UserPages me={me} />
                    </section>
                  </>
                )}
              </>
            ) : (
              <>
                <nav>
                  <NoLoginMenu />
                </nav>
                <section>
                  <NoLoginPages />
                </section>
              </>
            )}
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
export default App;
