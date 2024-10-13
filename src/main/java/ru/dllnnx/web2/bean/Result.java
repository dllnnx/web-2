package ru.dllnnx.web2.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class Result implements Serializable {
    private Float x;
    private Float y;
    private Float r;
    private boolean isHit;
    private String startTime;
    private long scriptTime;

    public Result(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public String isHitToString() {
        return isHit ? "got it!" : "fail(";
    }

    public String getHTMLClass() {
        return isHit ? "success" : "fail";
    }
}
