import "dreamland";
import { Route, Router } from "dreamland-router";
import Home from "./routes/home";
import "./index.css";

new Router(
    (
        <Route>
            <Route path="/" show={<Home />} />
        </Route>
    ),
).mount(document.getElementById("app"));
