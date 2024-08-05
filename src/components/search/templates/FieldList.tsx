import { selectFacet } from "@/engine";
import { AtomicText, Result } from "@coveo/atomic-react";
import { Container, Link } from "@mui/material";
import { preventClickPropagation } from "./Default";

export default function FieldList({
  result,
  field,
  label,
}: {
  result: Result;
  field: string;
  label: string;
}) {
  const fieldValues: string[] = (result.raw[field] as string[]) || [];

  if (fieldValues.length < 1) {
    return null;
  }

  const links = fieldValues.map((value: string) => {
    return (
      <Link
        key={`${field}--${value}`}
        onClick={(e) => {
          preventClickPropagation(e);
          selectFacet(field, value);
        }}
      >
        {value}
      </Link>
    );
  });

  return (
    <Container className="field-list">
      <span className="field-label">
        <AtomicText value={label}></AtomicText>:
      </span>
      {links}
    </Container>
  );
}
