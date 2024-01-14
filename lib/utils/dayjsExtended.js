import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const dayjsExtended = dayjs;
dayjsExtended.extend(utc);
dayjsExtended.extend(timezone);

export default dayjsExtended;
