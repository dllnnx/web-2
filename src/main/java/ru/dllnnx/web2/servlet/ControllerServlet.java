package ru.dllnnx.web2.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.dllnnx.web2.Validator;

import java.io.IOException;

@WebServlet("/controller-servlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (new Validator(req).isValidRequest()) {
            req.getRequestDispatcher("./area-check-servlet").forward(req, resp);
        } else {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("Invalid request: Some data is missing");
        }
    }
}
