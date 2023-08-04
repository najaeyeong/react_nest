import { useState, useEffect } from "react";
import apiServer from "../api/apiServer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import arraySupport from "dayjs/plugin/arraySupport";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { AnyError } from "typeorm";
import { pink, blue, grey } from "@mui/material/colors";
dayjs.extend(utc);
dayjs.extend(arraySupport);
export function Month() {
  const timeList = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];
  const minList = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ];
  const [monType, setMonType] = useState<string>("소정근로일");
  const [tueType, setTueType] = useState<string>("소정근로일");
  const [wedType, setWedType] = useState<string>("소정근로일");
  const [thuType, setThuType] = useState<string>("소정근로일");
  const [friType, setFriType] = useState<string>("소정근로일");
  const [satType, setSatType] = useState<string>("휴무일");
  const [sunType, setSunType] = useState<string>("무급휴일");

  const [monRestList, setMonRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [tueRestList, setTueRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [wedRestList, setWedRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [thuRestList, setThuRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [friRestList, setFriRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [satRestList, setSatRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);
  const [sunRestList, setSunRestList] = useState<
    {
      시작시: number;
      시작분: number;
      종료시: number;
      종료분: number;
    }[]
  >([]);

  const [monRest, setMonRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [tueRest, setTueRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [wedRest, setWedRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [thuRest, setThuRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [friRest, setFriRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [satRest, setSatRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });
  const [sunRest, setSunRest] = useState<{
    시작시: number;
    시작분: number;
    종료시: number;
    종료분: number;
  }>({ 시작시: 0, 시작분: 0, 종료시: 0, 종료분: 0 });

  const [monWorkTime, setMonWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 9,
    출근분: 0,
    퇴근시: 18,
    퇴근분: 0,
  });
  const [tueWorkTime, setTueWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 9,
    출근분: 0,
    퇴근시: 18,
    퇴근분: 0,
  });
  const [wedWorkTime, setWedWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 9,
    출근분: 0,
    퇴근시: 18,
    퇴근분: 0,
  });
  const [thuWorkTime, setThuWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 9,
    출근분: 0,
    퇴근시: 18,
    퇴근분: 0,
  });
  const [friWorkTime, setFriWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 9,
    출근분: 0,
    퇴근시: 18,
    퇴근분: 0,
  });
  const [satWorkTime, setSatWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 0,
    출근분: 0,
    퇴근시: 0,
    퇴근분: 0,
  });
  const [sunWorkTime, setSunWorkTime] = useState<{
    출근시: number;
    출근분: number;
    퇴근시: number;
    퇴근분: number;
  }>({
    출근시: 0,
    출근분: 0,
    퇴근시: 0,
    퇴근분: 0,
  });

  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2023);
  const [일일소정근로시간기준, set일일소정근로시간기준] = useState<number>(8);
  const [주소정근로시간기준, set주소정근로시간기준] = useState<number>(40);

  const [근무타입, set근무타입] = useState<
    {
      날짜: string;
      날짜타입: string;
      휴식시간목록: { 시작시간: string; 종료시간: string }[];
    }[]
  >([]);

  const [근태기록, set근태기록] = useState<
    { 날짜: string; 근무시간: { 출근시간: string; 퇴근시간: string } }[]
  >([]);

  const [연차기록, set연차기록] = useState<
    { 날짜: string; 연차시간: number }[]
  >([]);
  const [외출기록, set외출기록] = useState<
    { 날짜: string; 외출시간: number }[]
  >([]);

  const [workTimeList, setWorkTimeList] = useState<any[]>([]);
  const [chart, setChart] = useState<JSX.Element>(<></>);
  const [chart2, setChart2] = useState<JSX.Element>(<></>);
  const make근태근무타입 = () => {
    const preMonthLastDate = dayjs([year, month - 2]).daysInMonth(); // 전달의 마지막 일수
    const MonthLastDate = dayjs([year, month - 1]).daysInMonth(); //구할 달의 마지막 일수
    const MonthFirstDay = dayjs([year, month - 1, 1]).get("day");
    //이전 달의 근태기록 정보 를 담을 배열
    let month근무타입:
      | {
          날짜타입: string;
          날짜: string;
          휴식시간목록: { 시작시간: string; 종료시간: string }[];
        }[] = [];
    let month근무시간: {
      날짜: string;
      근무시간: { 출근시간: string; 퇴근시간: string };
    }[] = [];

    let firstDate: dayjs.Dayjs;
    let lastDate: dayjs.Dayjs;

    if (MonthFirstDay - 1 > 0) {
      //1일이 화수목금토
      firstDate = dayjs([
        year,
        month - 2,
        preMonthLastDate - MonthFirstDay + 2,
      ]);
      lastDate = dayjs([year, month - 1, MonthLastDate]);
    } else if (MonthFirstDay - 1 === 0) {
      //1일이 월요일
      firstDate = dayjs([year, month - 1, 1]);
      lastDate = dayjs([year, month - 1, MonthLastDate]);
    } else {
      //1일이 일요일
      firstDate = dayjs([year, month - 2, preMonthLastDate - 5]);
      lastDate = dayjs([year, month - 1, MonthLastDate]);
    }

    let 날짜타입: string = "";
    let 휴식시간목록: {
      시작시간: string;
      종료시간: string;
    }[] = [];
    let 근무시간: { 출근시간: string; 퇴근시간: string } = {
      출근시간: "",
      퇴근시간: "",
    };

    while (!firstDate.isSame(lastDate.add(1, "day"))) {
      if (firstDate.get("day") === 0) {
        //일요일
        날짜타입 = sunType;
        //휴식시간목록 =
        // eslint-disable-next-line no-loop-func, array-callback-return
        sunRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });

        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            sunWorkTime?.출근시,
            sunWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            sunWorkTime?.퇴근시,
            sunWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 1) {
        //월요일
        날짜타입 = monType;
        //휴식시간목록 = monRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        monRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            monWorkTime?.출근시,
            monWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            monWorkTime?.퇴근시,
            monWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 2) {
        //화요일
        날짜타입 = tueType;
        //휴식시간목록 = tueRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        tueRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            tueWorkTime?.출근시,
            tueWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            tueWorkTime?.퇴근시,
            tueWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 3) {
        //수요일
        날짜타입 = wedType;
        //휴식시간목록 = wedRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        wedRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            wedWorkTime?.출근시,
            wedWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            wedWorkTime?.퇴근시,
            wedWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 4) {
        //목요일
        날짜타입 = thuType;
        //휴식시간목록 = thuRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        thuRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            thuWorkTime?.출근시,
            thuWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            thuWorkTime?.퇴근시,
            thuWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 5) {
        //금요일
        날짜타입 = friType;
        // 휴식시간목록 = friRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        friRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            friWorkTime?.출근시,
            friWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            friWorkTime?.퇴근시,
            friWorkTime?.퇴근분,
          ]).format(),
        };
      } else if (firstDate.get("day") === 6) {
        //토요일
        날짜타입 = satType;
        // 휴식시간목록 = satRestList;
        // eslint-disable-next-line no-loop-func, array-callback-return
        satRestList.map((rest) => {
          휴식시간목록.push({
            시작시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.시작시,
              rest.시작분,
            ]).format(),
            종료시간: dayjs([
              year,
              month - 1,
              firstDate.get("date"),
              rest.종료시,
              rest.종료분,
            ]).format(),
          });
        });
        근무시간 = {
          출근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            satWorkTime?.출근시,
            satWorkTime?.출근분,
          ]).format(),
          퇴근시간: dayjs([
            year,
            month - 1,
            firstDate.get("date"),
            satWorkTime?.퇴근시,
            satWorkTime?.퇴근분,
          ]).format(),
        };
      }

      const day근무시간 = { 날짜: firstDate.format(), 근무시간 };
      month근무시간.push(day근무시간);
      if (month근무시간) {
        set근태기록(month근무시간);
      }
      const day근무타입 = {
        날짜타입: 날짜타입,
        날짜: firstDate.format(),
        휴식시간목록,
      };
      month근무타입.push(day근무타입);
      firstDate = firstDate.add(1, "day");
      휴식시간목록 = [];
    }

    if (month근무타입) {
      set근무타입(month근무타입);
    }
  };

  const getDay = (date: dayjs.Dayjs) => {
    switch (date.get("day")) {
      case 0:
        return "일";
      case 1:
        return "월";
      case 2:
        return "화";
      case 3:
        return "수";
      case 4:
        return "목";
      case 5:
        return "금";
      case 6:
        return "토";
    }
  };

  const get날짜타입 = (date: dayjs.Dayjs) => {
    switch (date.get("day")) {
      case 0:
        return sunType;
      case 1:
        return monType;
      case 2:
        return tueType;
      case 3:
        return wedType;
      case 4:
        return thuType;
      case 5:
        return friType;
      case 6:
        return satType;
    }
  };

  const makeChart = () => {
    const chart = (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  height={80}
                >
                  날짜
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  요일
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  날짜타입
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  출근시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  퇴근시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  외출시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  연차시간
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {근무타입.map((row) => (
                <TableRow
                  key={row.날짜}
                  sx={{
                    border: 1,
                    backgroundColor:
                      dayjs(row.날짜).get("month") !== month - 1
                        ? grey[400]
                        : row.날짜타입 === "휴무일"
                        ? blue[100]
                        : row.날짜타입 === "유급휴일" ||
                          row.날짜타입 === "무급휴일"
                        ? pink[100]
                        : "white",
                  }}
                >
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    component="th"
                    scope="row"
                    height={80}
                  >
                    {dayjs(row.날짜).format("MM/DD/YYYY")}
                  </TableCell>
                  {/*요일 */}
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    {getDay(dayjs(row.날짜))}
                  </TableCell>

                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    <Select
                      sx={{ fontSize: 20, fontWeight: 1000 }}
                      defaultValue={get날짜타입(dayjs(row.날짜))}
                      onChange={(e) => {
                        row.날짜타입 = e.target.value;
                        set근무타입(근무타입);
                      }}
                    >
                      <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
                      <MenuItem value={"휴무일"}>휴무일</MenuItem>
                      <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
                      <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    <Box display={"flex"}>
                      <TextField
                        sx={{ width: 100 }}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 1000 },
                        }}
                        defaultValue={dayjs(
                          근태기록.find((x) => x.날짜 === row.날짜)?.근무시간
                            .출근시간
                        ).get("hour")}
                        onChange={(e) => {
                          const newList = 근태기록.map((i) => {
                            if (i.날짜 === row.날짜) {
                              i.근무시간.출근시간 = dayjs(i.근무시간.출근시간)
                                .set("hour", Number(e.target.value))
                                .format();
                              return i;
                            } else {
                              return i;
                            }
                          });
                          set근태기록(newList);
                        }}
                      />
                      시
                      <TextField
                        sx={{ width: 100 }}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 1000 },
                        }}
                        defaultValue={dayjs(
                          근태기록.find((x) => x.날짜 === row.날짜)?.근무시간
                            .출근시간
                        ).get("minute")}
                        onChange={(e) => {
                          const newList = 근태기록.map((i) => {
                            if (i.날짜 === row.날짜) {
                              i.근무시간.출근시간 = dayjs(i.근무시간.출근시간)
                                .set("minute", Number(e.target.value))
                                .format();
                              return i;
                            } else {
                              return i;
                            }
                          });
                          set근태기록(newList);
                        }}
                      />
                      분
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    <Box display={"flex"}>
                      <TextField
                        sx={{ width: 100 }}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 1000 },
                        }}
                        defaultValue={dayjs(
                          근태기록.find((x) => x.날짜 === row.날짜)?.근무시간
                            .퇴근시간
                        ).get("hour")}
                        onChange={(e) => {
                          const newList = 근태기록.map((i) => {
                            if (i.날짜 === row.날짜) {
                              i.근무시간.퇴근시간 = dayjs(i.근무시간.퇴근시간)
                                .set("hour", Number(e.target.value))
                                .format();
                              return i;
                            } else {
                              return i;
                            }
                          });
                          set근태기록(newList);
                        }}
                      />
                      시
                      <TextField
                        sx={{ width: 100 }}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 1000 },
                        }}
                        defaultValue={dayjs(
                          근태기록.find((x) => x.날짜 === row.날짜)?.근무시간
                            .퇴근시간
                        ).get("minute")}
                        onChange={(e) => {
                          const newList = 근태기록.map((i) => {
                            if (i.날짜 === row.날짜) {
                              i.근무시간.퇴근시간 = dayjs(i.근무시간.퇴근시간)
                                .set("minute", Number(e.target.value))
                                .format();
                              return i;
                            } else {
                              return i;
                            }
                          });
                          set근태기록(newList);
                        }}
                      />
                      분
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    <TextField
                      sx={{ width: 100 }}
                      inputProps={{ style: { fontSize: 30, fontWeight: 1000 } }}
                      defaultValue={
                        외출기록.find((x) => x.날짜 === row.날짜)?.외출시간
                      }
                      onChange={(e) => {
                        if (외출기록.find((x) => x.날짜 === row.날짜)) {
                          const new외출기록 = 외출기록.map((x) => {
                            if (x.날짜 === row.날짜) {
                              x.외출시간 = Number(e.target.value);
                            }
                            return x;
                          });
                          set외출기록(new외출기록);
                        } else {
                          set외출기록([
                            ...외출기록,
                            {
                              날짜: row.날짜,
                              외출시간: Number(e.target.value),
                            },
                          ]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                    align="right"
                  >
                    <TextField
                      sx={{ width: 100 }}
                      inputProps={{ style: { fontSize: 30, fontWeight: 1000 } }}
                      defaultValue={
                        연차기록.find((x) => x.날짜 === row.날짜)?.연차시간
                      }
                      onChange={(e) => {
                        if (연차기록.find((x) => x.날짜 === row.날짜)) {
                          const new연차기록 = 연차기록.map((x) => {
                            if (x.날짜 === row.날짜) {
                              x.연차시간 = Number(e.target.value);
                            }
                            return x;
                          });
                          set연차기록(new연차기록);
                        } else {
                          set연차기록([
                            ...연차기록,
                            {
                              날짜: row.날짜,
                              연차시간: Number(e.target.value),
                            },
                          ]);
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
        <Button
          onClick={() => {
            console.log(근무타입, 근태기록, 외출기록, 연차기록);
          }}
        >
          버튼
        </Button>
      </>
    );
    return chart;
  };

  const makeChart2 = () => {
    const chart2 = (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ border: 2 }}>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  height={80}
                  align="right"
                >
                  총근무시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  총휴식시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  유급근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  일일소정근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  근태조정
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  초과근로
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  연장근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  야간근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  연장야간근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  실근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  누적실근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  누적유급근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  누적소정근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  휴일근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  휴일연장근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  휴일야간근로시간
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, border: 1, fontWeight: 1000 }}
                  align="right"
                >
                  휴일연장야간근로시간
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workTimeList.map((row) => (
                <TableRow
                  key={row.날짜}
                  sx={{
                    border: 1,
                    backgroundColor:
                      dayjs(row.날짜).get("month") !== month - 1
                        ? grey[400]
                        : row.날짜타입 === "휴무일"
                        ? blue[100]
                        : row.날짜타입 === "유급휴일" ||
                          row.날짜타입 === "무급휴일"
                        ? pink[100]
                        : "white",
                  }}
                >
                  <TableCell
                    sx={{ fontSize: 40, border: 1 }}
                    component="th"
                    scope="row"
                  >
                    {row.시간정리목록.총근무시간}
                  </TableCell>

                  <TableCell
                    sx={{ fontSize: 40, border: 1 }}
                    align="right"
                    height={80}
                  >
                    {row.시간정리목록.총휴식시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.유급근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.일일소정근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.근태조정}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.초과근로}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.연장근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.야간근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.연장야간근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.실근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.누적실근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.누적유급근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.누적소정근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.휴일근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.휴일연장근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.휴일야간근로시간}
                  </TableCell>
                  <TableCell sx={{ fontSize: 40, border: 1 }} align="right">
                    {row.시간정리목록.휴일연장야간근로시간}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
    return chart2;
  };

  const postDate = async () => {
    const formdata = {
      근태기록,
      근무타입,
      연차기록,
      외출기록,
      year,
      month,
      일일소정근로시간기준,
      주소정근로시간기준,
    };
    console.log(formdata);
    // await apiServer
    //   .post("/worktime/MonthWorkTimeList", formdata)
    await axios
      .post(`http://52.79.56.54:8080/worktime/MonthWorkTimeList`, formdata)
      .then((res) => {
        console.log(res.data);
        let list: any[] = [];
        res.data.map((i: any) => {
          i.주시간정리목록.map((j: any) => {
            list.push(j);
          });
        });
        setWorkTimeList(list);
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
        alert(`error:${err}`);
      });
  };

  useEffect(() => {
    setChart(makeChart());
  }, [근무타입, 근태기록, 외출기록, 외출기록, workTimeList]);

  useEffect(() => {
    setChart2(makeChart2());
  }, [workTimeList]);

  return (
    <>
      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>월:</Box>
        <Box>
          <Select
            value={monType}
            onChange={(e) => {
              setMonType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={monWorkTime.출근시}
              onChange={(e) => {
                monWorkTime.출근시 = Number(e.target.value);
                setMonWorkTime(monWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={monWorkTime.출근분}
              onChange={(e) => {
                monWorkTime.출근분 = Number(e.target.value);
                setMonWorkTime(monWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={monWorkTime.퇴근시}
              onChange={(e) => {
                monWorkTime.퇴근시 = Number(e.target.value);
                setMonWorkTime(monWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={monWorkTime.퇴근분}
              onChange={(e) => {
                monWorkTime.퇴근분 = Number(e.target.value);
                setMonWorkTime(monWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                monRest.시작시 = Number(e.target.value);
                setMonRest(monRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                monRest.시작분 = Number(e.target.value);
                setMonRest(monRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                monRest.종료시 = Number(e.target.value);
                setMonRest(monRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                monRest.종료분 = Number(e.target.value);
                setMonRest(monRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...monRestList,
                {
                  시작시: monRest.시작시,
                  시작분: monRest.시작분,
                  종료시: monRest.종료시,
                  종료분: monRest.종료분,
                },
              ];
              console.log(monRestList, monRest, newList);

              setMonRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {monRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = monRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setMonRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>화:</Box>
        <Box>
          <Select
            value={tueType}
            onChange={(e) => {
              setTueType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={tueWorkTime.출근시}
              onChange={(e) => {
                tueWorkTime.출근시 = Number(e.target.value);
                setTueWorkTime(tueWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={tueWorkTime.출근분}
              onChange={(e) => {
                tueWorkTime.출근분 = Number(e.target.value);
                setTueWorkTime(tueWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={tueWorkTime.퇴근시}
              onChange={(e) => {
                tueWorkTime.퇴근시 = Number(e.target.value);
                setTueWorkTime(tueWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={tueWorkTime.퇴근분}
              onChange={(e) => {
                tueWorkTime.퇴근분 = Number(e.target.value);
                setTueWorkTime(tueWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                tueRest.시작시 = Number(e.target.value);
                setTueRest(tueRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                tueRest.시작분 = Number(e.target.value);
                setTueRest(tueRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                tueRest.종료시 = Number(e.target.value);
                setTueRest(tueRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                tueRest.종료분 = Number(e.target.value);
                setTueRest(tueRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...tueRestList,
                {
                  시작시: tueRest.시작시,
                  시작분: tueRest.시작분,
                  종료시: tueRest.종료시,
                  종료분: tueRest.종료분,
                },
              ];
              console.log(tueRestList, tueRest, newList);

              setTueRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {tueRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = tueRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setTueRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>수:</Box>
        <Box>
          <Select
            value={wedType}
            onChange={(e) => {
              setWedType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={wedWorkTime.출근시}
              onChange={(e) => {
                wedWorkTime.출근시 = Number(e.target.value);
                setWedWorkTime(wedWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={wedWorkTime.출근분}
              onChange={(e) => {
                wedWorkTime.출근분 = Number(e.target.value);
                setWedWorkTime(wedWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={wedWorkTime.퇴근시}
              onChange={(e) => {
                wedWorkTime.퇴근시 = Number(e.target.value);
                setWedWorkTime(wedWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={wedWorkTime.퇴근분}
              onChange={(e) => {
                wedWorkTime.퇴근분 = Number(e.target.value);
                setWedWorkTime(wedWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                wedRest.시작시 = Number(e.target.value);
                setWedRest(wedRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                wedRest.시작분 = Number(e.target.value);
                setWedRest(wedRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                wedRest.종료시 = Number(e.target.value);
                setWedRest(wedRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                wedRest.종료분 = Number(e.target.value);
                setWedRest(wedRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...wedRestList,
                {
                  시작시: wedRest.시작시,
                  시작분: wedRest.시작분,
                  종료시: wedRest.종료시,
                  종료분: wedRest.종료분,
                },
              ];
              console.log(wedRestList, wedRest, newList);

              setWedRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {wedRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = wedRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setWedRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>목:</Box>
        <Box>
          <Select
            value={thuType}
            onChange={(e) => {
              setThuType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={thuWorkTime.출근시}
              onChange={(e) => {
                thuWorkTime.출근시 = Number(e.target.value);
                setThuWorkTime(thuWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={thuWorkTime.출근분}
              onChange={(e) => {
                thuWorkTime.출근분 = Number(e.target.value);
                setThuWorkTime(thuWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={thuWorkTime.퇴근시}
              onChange={(e) => {
                thuWorkTime.퇴근시 = Number(e.target.value);
                setThuWorkTime(thuWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={thuWorkTime.퇴근분}
              onChange={(e) => {
                thuWorkTime.퇴근분 = Number(e.target.value);
                setThuWorkTime(thuWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                thuRest.시작시 = Number(e.target.value);
                setThuRest(thuRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                thuRest.시작분 = Number(e.target.value);
                setThuRest(thuRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                thuRest.종료시 = Number(e.target.value);
                setThuRest(thuRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                thuRest.종료분 = Number(e.target.value);
                setThuRest(thuRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...thuRestList,
                {
                  시작시: thuRest.시작시,
                  시작분: thuRest.시작분,
                  종료시: thuRest.종료시,
                  종료분: thuRest.종료분,
                },
              ];
              console.log(thuRestList, thuRest, newList);

              setThuRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {thuRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = thuRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setThuRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>금:</Box>
        <Box>
          <Select
            value={friType}
            onChange={(e) => {
              setFriType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={friWorkTime.출근시}
              onChange={(e) => {
                friWorkTime.출근시 = Number(e.target.value);
                setFriWorkTime(friWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={friWorkTime.출근분}
              onChange={(e) => {
                friWorkTime.출근분 = Number(e.target.value);
                setFriWorkTime(friWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={friWorkTime.퇴근시}
              onChange={(e) => {
                friWorkTime.퇴근시 = Number(e.target.value);
                setFriWorkTime(friWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={friWorkTime.퇴근분}
              onChange={(e) => {
                friWorkTime.퇴근분 = Number(e.target.value);
                setFriWorkTime(friWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                friRest.시작시 = Number(e.target.value);
                setFriRest(friRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                friRest.시작분 = Number(e.target.value);
                setFriRest(friRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                friRest.종료시 = Number(e.target.value);
                setFriRest(friRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                friRest.종료분 = Number(e.target.value);
                setFriRest(friRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...friRestList,
                {
                  시작시: friRest.시작시,
                  시작분: friRest.시작분,
                  종료시: friRest.종료시,
                  종료분: friRest.종료분,
                },
              ];
              console.log(friRestList, friRest, newList);

              setFriRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {friRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = friRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setFriRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>토:</Box>
        <Box>
          <Select
            value={satType}
            onChange={(e) => {
              setSatType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={satWorkTime.출근시}
              onChange={(e) => {
                satWorkTime.출근시 = Number(e.target.value);
                setSatWorkTime(satWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={satWorkTime.출근분}
              onChange={(e) => {
                satWorkTime.출근분 = Number(e.target.value);
                setSatWorkTime(satWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={satWorkTime.퇴근시}
              onChange={(e) => {
                satWorkTime.퇴근시 = Number(e.target.value);
                setSatWorkTime(satWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={satWorkTime.퇴근분}
              onChange={(e) => {
                satWorkTime.퇴근분 = Number(e.target.value);
                setSatWorkTime(satWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                satRest.시작시 = Number(e.target.value);
                setSatRest(satRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                satRest.시작분 = Number(e.target.value);
                setSatRest(satRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                satRest.종료시 = Number(e.target.value);
                setSatRest(satRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                satRest.종료분 = Number(e.target.value);
                setSatRest(satRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...satRestList,
                {
                  시작시: satRest.시작시,
                  시작분: satRest.시작분,
                  종료시: satRest.종료시,
                  종료분: satRest.종료분,
                },
              ];
              console.log(satRestList, satRest, newList);

              setSatRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {satRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = satRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setSatRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>일:</Box>
        <Box>
          <Select
            value={sunType}
            onChange={(e) => {
              setSunType(e.target.value);
            }}
          >
            <MenuItem value={"소정근로일"}>소정근로일</MenuItem>
            <MenuItem value={"휴무일"}>휴무일</MenuItem>
            <MenuItem value={"유급휴일"}>유급휴일</MenuItem>
            <MenuItem value={"무급휴일"}>무급휴일</MenuItem>
          </Select>
        </Box>

        <Box>
          <Box>
            출근시간:
            <Select
              defaultValue={sunWorkTime.출근시}
              onChange={(e) => {
                sunWorkTime.출근시 = Number(e.target.value);
                setSunWorkTime(sunWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={sunWorkTime.출근분}
              onChange={(e) => {
                sunWorkTime.출근분 = Number(e.target.value);
                setSunWorkTime(sunWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            퇴근시간:
            <Select
              defaultValue={sunWorkTime.퇴근시}
              onChange={(e) => {
                sunWorkTime.퇴근시 = Number(e.target.value);
                setSunWorkTime(sunWorkTime);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={sunWorkTime.퇴근분}
              onChange={(e) => {
                sunWorkTime.퇴근분 = Number(e.target.value);
                setSunWorkTime(sunWorkTime);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"}>
          <Box>휴식시간:</Box>
          <Box>
            시작시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                sunRest.시작시 = Number(e.target.value);
                setSunRest(sunRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                sunRest.시작분 = Number(e.target.value);
                setSunRest(sunRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
            종료시간:
            <Select
              defaultValue={0}
              onChange={(e) => {
                sunRest.종료시 = Number(e.target.value);
                setSunRest(sunRest);
              }}
            >
              {timeList.map((i) => {
                return <MenuItem value={i}>{`${i}시`}</MenuItem>;
              })}
            </Select>
            <Select
              defaultValue={0}
              onChange={(e) => {
                sunRest.종료분 = Number(e.target.value);
                setSunRest(sunRest);
              }}
            >
              {minList.map((i) => {
                return <MenuItem value={i}>{`${i}분`}</MenuItem>;
              })}
            </Select>
          </Box>
          <Button
            onClick={() => {
              const newList = [
                ...sunRestList,
                {
                  시작시: sunRest.시작시,
                  시작분: sunRest.시작분,
                  종료시: sunRest.종료시,
                  종료분: sunRest.종료분,
                },
              ];
              console.log(sunRestList, sunRest, newList);

              setSunRestList(newList);
            }}
          >
            추가
          </Button>
        </Box>

        <Box>
          휴식시간목록:
          {sunRestList.map((i) => {
            return (
              <Box>
                {i.시작시}시 - {i.시작분}분 ~ {i.종료시}시 - {i.종료분}분
                <Button
                  onClick={() => {
                    const newList = sunRestList.filter(
                      (x) => !(i.시작시 === x.시작시) && i.시작분 === x.시작분
                    );
                    setSunRestList(newList);
                  }}
                >
                  삭제
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ m: 3 }} display={"flex"}>
        <Box>
          년도:
          <TextField
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
          ></TextField>
        </Box>
        <Box>
          월:
          <TextField
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value));
            }}
          ></TextField>
        </Box>
        <Button
          onClick={() => {
            make근태근무타입();
          }}
        >
          기본타입적용
        </Button>
      </Box>
      <Box sx={{ ml: 20, mt: 20 }} display={"flex"}>
        <Box display={"flex"}>
          <Box sx={{ p: 1 }} fontSize={30}>
            일일소정근로시간기준:
          </Box>
          <TextField
            sx={{ width: 100 }}
            inputProps={{ style: { fontSize: 30, fontWeight: 1000 } }}
            value={일일소정근로시간기준}
            onChange={(e) => {
              set일일소정근로시간기준(Number(e.target.value));
            }}
          ></TextField>
        </Box>
        <Box display={"flex"}>
          <Box sx={{ ml: 4, p: 1 }} fontSize={30}>
            주소정근로시간기준:
          </Box>
          <TextField
            sx={{ width: 100 }}
            inputProps={{ style: { fontSize: 30, fontWeight: 1000 } }}
            value={주소정근로시간기준}
            onChange={(e) => {
              set주소정근로시간기준(Number(e.target.value));
            }}
          ></TextField>
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box>{chart}</Box>
        <Button
          variant="contained"
          onClick={() => {
            postDate();
          }}
        >
          적용
        </Button>
        <Box>{chart2}</Box>
      </Box>
    </>
  );
}

export default Month;
