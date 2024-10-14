<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="ru.dllnnx.web2.bean.ResultBean" %>
<%@ page import="ru.dllnnx.web2.bean.Result" %>

<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <%
        ResultBean resultBean = (session.getAttribute("bean") == null)
        ? new ResultBean()
        : (ResultBean) session.getAttribute("bean");
    %>
    <title>Hamster Kombat</title>
    <link rel="icon" type="image/png" href="images/icon.png">
    <link href="style.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poiret+One&display=swap" rel="stylesheet">
</head>
<body>
<header>
    <h2>Денисова Алена Александровна, P3211</h2>
    <h3>лабораторная работа №2. вариант 21077</h3>
</header>
<div id="main-container">

    <div id="labels-container">
        <label for="X-choice" id="X-label">выберите X:</label>
        <label for="Y-choice" id="Y-label">введите Y:</label>
        <label for="R-choice">выберите R:</label>
    </div>

    <div id="select-container">
        <div id="X-choice">
            <label><input type="radio" name="X-radio-group" value="-5">-5</label>
            <label><input type="radio" name="X-radio-group" value="-4">-4</label>
            <label><input type="radio" name="X-radio-group" value="-3">-3</label>
            <label><input type="radio" name="X-radio-group" value="-2">-2</label>
            <label><input type="radio" name="X-radio-group" value="-1">-1</label>
            <label><input type="radio" name="X-radio-group" value="0">0</label>
            <label><input type="radio" name="X-radio-group" value="1">1</label>
            <label><input type="radio" name="X-radio-group" value="2">2</label>
            <label><input type="radio" name="X-radio-group" value="3">3</label>
        </div>

        <input type="number" id="Y-choice" placeholder="от -3 до 3" step="0.001" min="-3" max="3">

        <input type="number" id="R-choice" placeholder="от 2 до 5" step="0.001" min="2" max="5">

        <div id="buttons-container">
            <button id="clear-button">очистить</button>
            <button id="submit-button">тапнуть хомяка</button>
        </div>
    </div>

    <div id="canvas-container">
        <canvas id="graph" width="400" height="400"></canvas>
    </div>
</div>
<div id="table-container">
    <table id="result-table">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>результат</th>
            <th>текущее время</th>
            <th>время работы</th>
        </tr>
        </thead>
        <tbody id="output">
            <%for (Result result: resultBean.getResults()) { %>
                <tr>
                    <td><%=result.getX()%></td>
                    <td><%=result.getY()%></td>
                    <td><%=result.getR()%></td>
                    <td class="<%=result.getHTMLClass()%>"><%=result.isHitToString()%></td>
                    <td><%=result.getStartTime()%></td>
                    <td><%=result.getScriptTime() + "mсs"%></td>
                </tr>
            <%}%>
        </tbody>
    </table>
</div>

</body>
<script src="js/onload.js"></script>
<script src="js/validation.js"></script>
<script src="js/CanvasPainter.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</html>