// ForecastCard.tsx
import { Card, CardBody } from "@nextui-org/react";

type ForecastCardProps = {
  day: string;
  temperature?: number;
  humidity?: number;
  wind?: number;
  rain?: number;
};

const ForecastCard: React.FC<ForecastCardProps> = ({ day, temperature, humidity, wind, rain }) => {
  return (
    <Card className="max-w-[150px] m-1">
      <CardBody>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold">{day}</h1> {/* Adjusted font size here */}
          {temperature && <p className="text-2xl font-bold">{temperature}°C</p>}
          {humidity && <p>{humidity}%</p>}
          {wind && <p>{wind} km/h</p>}
          {rain && <p>{rain} %</p>}
        </div>
      </CardBody>
    </Card>
  );
};

export default ForecastCard;
