import { DatePickerInput } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";

export default function CalendarField({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
}) {
  return (
    <MantineProvider>
      <DatePickerInput
        label="Period"
        placeholder="Select date"
        value={value}
        onChange={onChange as any}
        clearable
        radius="md"
        size="md"
        dropdownType="modal"
        minDate={dayjs().toDate()}
        styles={{
          input: {
            backgroundColor: "var(--input-bg)",
            color: "white",
            height: 53,
          },
          label: {
            color: "var(--t-color)",
            fontSize: 12,
            marginBottom: 6,
          },
        }}
      />
    </MantineProvider>
  );
}
