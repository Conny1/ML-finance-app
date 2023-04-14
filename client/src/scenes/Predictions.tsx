import styled from "styled-components";
import { useGetKpisQuery } from "../state/api";
import { useMemo, useState } from "react";
import regression, { DataPoint } from "regression";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Containeter = styled.div`
  /* outline:1px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: #27262a;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.2rem 0.15rem rgba(0, 0, 0, 0.8);
  height: 90%;
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;
const Box = styled.div`
  flex: 1;
`;
const Button = styled.button`
  min-height: 30px;
  background-color: #7c7b7b;
  border-radius: 3px;
  box-shadow: 0.5rem 0.2rem 0.15rem rgba(0, 0, 0, 0.4);
`;
const Text = styled.p`
  color: #7c7b7b;
  margin-top: 0;
`;
const H4 = styled.h4`
  color: #e0d9d9;
  margin-bottom: 0;
`;

const Predictions = () => {
  const [isprediction, setIsprediction] = useState<boolean>(false);
  const { data: kpis } = useGetKpisQuery();

  const formatedData = useMemo(() => {
    if (!kpis) return [];
    const monthData = kpis[0].monthlyData;
    const formated: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );

    const regresstionLine = regression.linear(formated);
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regresstionLine.points[i][1],
        "Predicted Revenue": regresstionLine.predict(i + 12)[1],
      };
    });
  }, [kpis]);
  return (
    <Containeter>
      <Wrapper>
        <Item>
          <Item style={{ display: "block" }}>
            <H4>Revenue and Predictions</H4>
            <Text>
              charted revenue and predicted revenue based on a simple linear
              regression model{" "}
            </Text>
          </Item>
          <Button onClick={() => setIsprediction(!isprediction)}>
            {" "}
            Show Predicted Revenue for Next Year
          </Button>
        </Item>

        <Box>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formatedData}
              margin={{
                top: 20,
                right: 75,
                left: 20,
                bottom: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0d9d9" />
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "13px" }}
              >
                <Label value="Month" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis
                domain={[12000, 26000]}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "13px" }}
                tickFormatter={(v) => `$${v}`}
              >
                <Label
                  value="Revenue in USD"
                  angle={-90}
                  offset={-5}
                  position="insideLeft"
                />
              </YAxis>
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="Actual Revenue"
                stroke="#e0d9d9"
                strokeWidth={0}
                dot={{ strokeWidth: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Regression Line"
                stroke="#7b75df"
                dot={false}
              />
              {isprediction && (
                <Line
                  strokeDasharray="5 5"
                  dataKey="Predicted Revenue"
                  stroke="#65efd2"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Wrapper>
    </Containeter>
  );
};

export default Predictions;
