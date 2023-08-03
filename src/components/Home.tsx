import { useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
export function Home() {
  const [출근시간, set출근시간] = useState();
  const [퇴근시간, set퇴근시간] = useState();
  const [휴식시간목록, set휴식시간목록] = useState<
    { 시작시간: string; 종료시간: string }[]
  >([]);
  const [익일휴식시간목록, set익일휴식시간목록] = useState<
    { 시작시간: string; 종료시간: string }[]
  >([]);
  const [출근날짜, set출근날짜] = useState<Date>(new Date());
  const [출근시, set출근시] = useState<number>(0);
  const [출근분, set출근분] = useState<number>(0);
  const [출근일, set출근일] = useState<number>(0);
  const [출근년, set출근년] = useState<number>(0);
  const [출근월, set출근월] = useState<number>(0);

  const [퇴근시, set퇴근시] = useState<number>(0);
  const [퇴근분, set퇴근분] = useState<number>(0);
  const [퇴근일, set퇴근일] = useState<Date>(new Date());

  const [시작날짜, set시작날짜] = useState<Date>(new Date());
  const [시작시, set시작시] = useState<number>(0);
  const [시작분, set시작분] = useState<number>(0);
  const [시작일, set시작일] = useState<number>(0);
  const [시작년, set시작년] = useState<number>(0);
  const [시작월, set시작월] = useState<number>(0);

  const [종료시, set종료시] = useState<number>(0);
  const [종료분, set종료분] = useState<number>(0);
  const [종료일, set종료일] = useState<Date>(new Date());

  const [총근무시간, set총근무시간] = useState<number>(0);
  const [총휴식시간, set총휴식시간] = useState<number>(0);
  const [일일소정근로시간, set일일소정근로시간] = useState<number>(0);
  const [야간근로시간, set야간근로시간] = useState<number>(0);
  const [연장근로시간, set연장근로시간] = useState<number>(0);
  const [연장야간근로시간, set연장야간근로시간] = useState<number>(0);
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

  const [checked, setChecked] = useState<boolean>(true);

  const handlerCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handlerRestList = (
    시작날짜: Date,
    시작시: number,
    시작분: number,
    종료시: number,
    종료분: number
  ) => {
    const _시작시간 = dayjs(시작날짜)
      .set("hour", 시작시)
      .set("minute", 시작분)
      .set("second", 0);

    const _종료시간 = dayjs(시작날짜)
      .set("hour", 종료시)
      .set("minute", 종료분)
      .set("second", 0);

    console.log(시작날짜, _시작시간, _종료시간);
    console.log(_시작시간.isBefore(_종료시간));
    if (_시작시간.isBefore(_종료시간)) {
      set휴식시간목록([
        ...휴식시간목록,
        { 시작시간: _시작시간.format(), 종료시간: _종료시간.format() },
      ]);
      set익일휴식시간목록([
        ...익일휴식시간목록,
        {
          시작시간: _시작시간.add(1, "day").format(),
          종료시간: _종료시간.add(1, "day").format(),
        },
      ]);
    } else {
      _종료시간.add(1, "day");
      set휴식시간목록([
        ...휴식시간목록,
        {
          시작시간: _시작시간.format(),
          종료시간: _종료시간.add(1, "day").format(),
        },
      ]);
      set익일휴식시간목록([
        ...익일휴식시간목록,
        {
          시작시간: _시작시간.add(1, "day").format(),
          종료시간: _종료시간.add(1, "day").format(),
        },
      ]);
    }
  };

  const deleteRestList = (t: { 시작시간: string; 종료시간: string }) => {
    const newlist = 휴식시간목록.filter(
      (value) => value.시작시간 !== t.시작시간
    );
    set휴식시간목록(newlist);

    const nextDay = dayjs(t.시작시간).add(1, "day").format();
    const newlist2 = 익일휴식시간목록.filter(
      (value) => value.시작시간 !== nextDay
    );
    set익일휴식시간목록(newlist2);
    console.log(휴식시간목록, 익일휴식시간목록, nextDay);
  };

  const postWorkTimeList = async (
    출근날짜: Date,
    출근시: number,
    출근분: number,
    퇴근시: number,
    퇴근분: number
  ) => {
    const _출근시간 = dayjs(출근날짜)
      .set("hour", 출근시)
      .set("minute", 출근분)
      .set("second", 0);
    const _퇴근시간 = dayjs(출근날짜)
      .set("hour", 퇴근시)
      .set("minute", 퇴근분)
      .set("second", 0);
    let formdata;
    if (_출근시간.isBefore(_퇴근시간)) {
      formdata = {
        근무시간: {
          출근시간: _출근시간.format(),
          퇴근시간: _퇴근시간.format(),
        },
        휴식시간목록,
      };
    } else {
      formdata = {
        근무시간: {
          출근시간: _출근시간.format(),
          퇴근시간: _퇴근시간.add(1, "day").format(),
        },
        휴식시간목록,
      };
    }
    if (checked) {
      formdata.휴식시간목록 = [...휴식시간목록, ...익일휴식시간목록];
    } else {
      formdata.휴식시간목록 = 휴식시간목록;
    }

    console.log(formdata);
    // await axios
    //   .post("/cats/test3", formdata)
    await apiServer
      .post("cats/test3", formdata)
      .then((res) => {
        set총근무시간(res.data.data.총근무시간);
        set총휴식시간(res.data.data.총휴식시간);
        set일일소정근로시간(res.data.data.일일소정근로시간);
        set야간근로시간(res.data.data.야간근로시간);
        set연장근로시간(res.data.data.연장근로시간);
        set연장야간근로시간(res.data.data.연장야간근로시간);
        console.log(res.data);
      })
      .catch((err) => {
        alert(`error:${err}`);
      });
  };

  return (
    <>
      <Box display={"flex"}>
        <Box sx={{ p: 5 }}> 날짜 :</Box>
        <Box sx={{ p: 5 }}>
          <DatePicker
            selected={출근날짜}
            onChange={(date: Date) => {
              set출근날짜(date);
              set출근일(date.getDate());
              set출근년(date.getFullYear());
              set출근월(date.getMonth() + 1);
            }}
          />
          {/* {`${출근일.getFullYear()},${출근일.getMonth() + 1},${new Date(
            출근일.getTime() + 1000 * 60 * 60 * 9
          ).getDate()}`} */}
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box sx={{ p: 5 }}>출근시간 : </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">시</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={출근시}
            label="시"
            onChange={(e) => {
              set출근시(Number(e.target.value));
            }}
          >
            {timeList.map((i) => {
              return <MenuItem value={i}>{`${i}시`}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">분</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={출근분}
            label="분"
            onChange={(e) => {
              set출근분(Number(e.target.value));
            }}
          >
            {minList.map((i) => {
              return <MenuItem value={i}>{`${i}분`}</MenuItem>;
            })}
          </Select>
        </Box>

        <Box sx={{ p: 5 }}>퇴근시간 : </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">시</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={퇴근시}
            label="시"
            onChange={(e) => {
              set퇴근시(Number(e.target.value));
            }}
          >
            {timeList.map((i) => {
              return <MenuItem value={i}>{`${i}시`}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">분</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={퇴근분}
            label="분"
            onChange={(e) => {
              set퇴근분(Number(e.target.value));
            }}
          >
            {minList.map((i) => {
              return <MenuItem value={i}>{`${i}분`}</MenuItem>;
            })}
          </Select>
        </Box>
      </Box>

      <Box>휴식시간추가</Box>
      <Box display={"flex"}>
        <Box sx={{ p: 5 }}> 날짜 :</Box>
        <Box sx={{ p: 5 }}>
          <DatePicker
            selected={시작날짜}
            onChange={(date: Date) => {
              console.log(
                date,
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              );
              set시작날짜(date);
              set시작일(date.getDate());
              set시작년(date.getFullYear());
              set시작월(date.getMonth() + 1);
            }}
          />
          {/* {`${출근일.getFullYear()},${출근일.getMonth() + 1},${new Date(
            출근일.getTime() + 1000 * 60 * 60 * 9
          ).getDate()}`} */}
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box sx={{ p: 5 }}>시작시간 : </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">시</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={시작시}
            label="시"
            onChange={(e) => {
              set시작시(Number(e.target.value));
            }}
          >
            {timeList.map((i) => {
              return <MenuItem value={i}>{`${i}시`}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">분</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={시작분}
            label="분"
            onChange={(e) => {
              set시작분(Number(e.target.value));
            }}
          >
            {minList.map((i) => {
              return <MenuItem value={i}>{`${i}분`}</MenuItem>;
            })}
          </Select>
        </Box>

        <Box sx={{ p: 5 }}>종료시간 : </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">시</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={종료시}
            label="시"
            onChange={(e) => {
              set종료시(Number(e.target.value));
            }}
          >
            {timeList.map((i) => {
              return <MenuItem value={i}>{`${i}시`}</MenuItem>;
            })}
          </Select>
        </Box>
        <Box sx={{ minWidth: 20 }}>
          <InputLabel id="demo-simple-select-label">분</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={종료분}
            label="분"
            onChange={(e) => {
              set종료분(Number(e.target.value));
            }}
          >
            {minList.map((i) => {
              return <MenuItem value={i}>{`${i}분`}</MenuItem>;
            })}
          </Select>
        </Box>
        <Button
          sx={{ m: 4 }}
          variant="contained"
          onClick={() => {
            handlerRestList(시작날짜, 시작시, 시작분, 종료시, 종료분);
          }}
        >
          추가
        </Button>
        <Box>
          익일반복
          <Checkbox defaultChecked checked={checked} onChange={handlerCheck} />
        </Box>
      </Box>
      <Box>
        {휴식시간목록.map((t, index) => {
          return (
            <Box>
              {t.시작시간} - {t.종료시간}
              <Button
                onClick={() => {
                  deleteRestList(t);
                }}
              >
                삭제
              </Button>
            </Box>
          );
        })}
        {checked ? (
          <>
            {익일휴식시간목록.map((t) => {
              return (
                <Box>
                  {t.시작시간} - {t.종료시간}
                </Box>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </Box>

      <Button
        onClick={() => {
          postWorkTimeList(출근날짜, 출근시, 출근분, 퇴근시, 퇴근분);
        }}
      >
        Post
      </Button>

      <Box sx={{ m: 5 }}>
        <Box> 총근무시간 : {총근무시간}</Box>
        <Box> 총휴식시간 : {총휴식시간}</Box>
        <Box> 일일소정근로시간 : {일일소정근로시간}</Box>
        <Box> 야간근로시간 : {야간근로시간}</Box>
        <Box> 연장근로시간 : {연장근로시간}</Box>
        <Box> 연장야간근로시간 : {연장야간근로시간}</Box>
      </Box>
    </>
  );
}

export default Home;
