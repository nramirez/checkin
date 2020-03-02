import { useOrgEvents } from "../hooks/events/load-org-events.hooks";
import { useRef, useState } from "react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { useInsertOrgEvent } from "../hooks/events/insert-org-events.hooks";
import { OrgEventInput, OrgEvent } from "../hooks/types";
import { useUpdateOrgEvent } from "../hooks/events/update-org-event.hooks";
import { LocationAutoComplete } from "./locationAutoComplete";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const OrgEvents = (): JSX.Element => {
    const { loading, data, fetchMore, count } = useOrgEvents({
        limit: 100,
        offset: 0
    });
    const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));
    const [insertOrgEvent] = useInsertOrgEvent();
    const [updateOrgEvent] = useUpdateOrgEvent();
    const ref = useRef();

    const handleOnPageChange = () => {
        const { currentPage, pageSize } = (ref as any).current.state;
        const hasNextPage = count > currentPage * pageSize;
        const shouldFetch = !loading && hasNextPage && data.length < currentPage * pageSize;
        if (shouldFetch) {
            fetchMore({
                limit: pageSize,
                offset: currentPage + 1
            });
        }
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper>
                <MaterialTable
                    tableRef={ref}
                    title="Members"
                    columns={[
                        { title: 'Description', field: 'description' },
                        { title: 'Details', field: 'details' },
                        { title: 'Location', field: 'location', editComponent: LocationAutoComplete },
                        {
                            title: 'Start', field: 'startTime',
                            editComponent: props =>
                                <KeyboardDateTimePicker
                                    variant="inline"
                                    ampm={false}
                                    label="Start Time"
                                    value={props.value}
                                    onChange={props.onChange}
                                    disablePast
                                    format="yyyy/MM/dd HH:mm" />
                        },
                        {
                            title: 'End', field: 'endTime',
                            editComponent: props =>
                                <KeyboardDateTimePicker
                                    variant="inline"
                                    ampm={false}
                                    label="End Time"
                                    value={props.value}
                                    onChange={props.onChange}
                                    disablePast
                                    format="yyyy/MM/dd HH:mm" />

                        },
                    ]}
                    options={
                        {
                            addRowPosition: 'first'
                        }
                    }
                    isLoading={loading}
                    data={data}
                    onChangePage={handleOnPageChange}
                    onChangeRowsPerPage={handleOnPageChange}
                    editable={{
                        onRowAdd: (input: OrgEventInput) => insertOrgEvent(input),
                        onRowUpdate: (newData: OrgEvent) => updateOrgEvent(newData.id, newData)
                    }}
                />
            </Paper>
        </MuiPickersUtilsProvider>
    );
}