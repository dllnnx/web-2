package ru.dllnnx.web2.servlet;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.dllnnx.web2.Validator;
import ru.dllnnx.web2.bean.Result;
import ru.dllnnx.web2.bean.ResultBean;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String startTime = req.getParameter("startTime");
        long start = Long.parseLong(req.getParameter("start"));

        Validator validator = new Validator(req);
        Result result = validator.getResult();

        try {
            if (!validator.isValidCoordinates()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("Invalid request: Invalid data");
                return;
            }

            boolean isHit = validator.checkArea();
            ResultBean bean = (ResultBean) req.getSession().getAttribute("bean");
            if (bean == null) {
                bean = new ResultBean();
                req.getSession().setAttribute("bean", bean);
            }

            result.setHit(isHit);
            result.setStartTime(startTime);
            result.setScriptTime(new Date().getTime() - start);
            bean.addResult(result);
            req.getSession().setAttribute("bean", bean);

            Gson gson = new Gson();
            Map<String, Object> json = new HashMap<>();
            json.put("x", result.getX());
            json.put("y", result.getY());
            json.put("r", result.getR());
            json.put("isHit", result.isHit());
            json.put("startTime", result.getStartTime());
            json.put("scriptTime", result.getScriptTime());
            String msg = gson.toJson(json);
            resp.getWriter().write(msg);
            resp.getWriter().flush();
        } catch (NumberFormatException e) {
            resp.getWriter().write("Invalid request: Wrong data format: " + e.getMessage());
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
