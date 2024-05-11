import { useParams } from "react-router-dom";

export default function NewsDetail(): JSX.Element {
  const { id } = useParams();

  return (
    <div>
      <div>detail</div>
    </div>
  );
}
