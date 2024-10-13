package ru.dllnnx.web2.bean;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.LinkedList;

@Setter
@Getter
public class ResultBean implements Serializable {
    private LinkedList<Result> results = new LinkedList<>();

    public void addResult(Result result) {
        this.results.add(result);
    }
}
