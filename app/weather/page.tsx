import WeatherClient from './weather-client';

export default function Home() {
  return (
    <main className="grow">
      <h1>Weather</h1>
      <WeatherClient />
    </main>
  );
}
