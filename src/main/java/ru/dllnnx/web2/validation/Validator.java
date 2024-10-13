package ru.dllnnx.web2.validation;

import jakarta.servlet.http.HttpServletRequest;
import ru.dllnnx.web2.bean.Result;

import java.util.Objects;

public class Validator {
    private final HttpServletRequest request;
    private Float x;
    private Float y;
    private Float r;

    public Validator (HttpServletRequest request) {
        this.request = request;
    }

    public Result getResult() {
        if (Objects.isNull(x) || Objects.isNull(y) || Objects.isNull(r)) {
            validateX(this.request.getParameter("x"));
            validateY(this.request.getParameter("y"));
            validateR(this.request.getParameter("r"));
        }
        return new Result(x, y, r);
    }

    public boolean isValidRequest() {
        return !Objects.isNull(request.getParameter("x")) && ! Objects.isNull(request.getParameter("y"))
                && !Objects.isNull(request.getParameter("r"));
    }

    public boolean isValidCoordinates() {
        return validateX(this.request.getParameter("x"))
                && validateY(this.request.getParameter("y"))
                && validateR(this.request.getParameter("r"));
    }

    private boolean validateX(String xParam) {
        if (Objects.isNull(xParam) || xParam.isEmpty()) return false;
        try {
            this.x = Float.parseFloat(xParam);
            return -5 <= x && x <= 3;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateY(String yParam) {
        if (Objects.isNull(yParam) || yParam.isEmpty()) return false;
        try {
            this.y = Float.parseFloat(yParam);
            return -3 <= y && y <= 3;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateR(String rParam) {
        if (Objects.isNull(rParam) || rParam.isEmpty()) return false;
        try {
            this.r = Float.parseFloat(rParam);
            return 2 <= r && r <= 5;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public boolean checkArea() {
        if (x > 0 && y > 0 && (x * x + y * y) > (r / 2) * (r / 2)) return false; // 1 четверть
        if (x < 0 && y > 0) return false; // 2 четверть
        if (x < 0 && y < 0 && y < - x - (r / 2)) return false; // 3 четверть
        if (x > 0 && y < 0 && (x > r || y < - r)) return false; // 4 четверть
        if (x == 0 && (y > (r/2) || (y < - r))) return false; // ось ОУ
        if (y == 0 && (x > r || x < - (r / 2))) return false; // ось ОХ
        return true;
    }
}
