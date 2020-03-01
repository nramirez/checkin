import { useOrgEvents } from "../hooks/events/load-org-events.hooks";
import { useRef } from "react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import { useInsertOrgEvent } from "../hooks/events/insert-org-events.hooks";
import { OrgEventInput, OrgEvent } from "../hooks/types";
import { useUpdateOrgEvent } from "../hooks/events/update-org-event.hooks";

export const OrgEvents = (): JSX.Element => {
    const { loading, data, fetchMore, count } = useOrgEvents({
        limit: 100,
        offset: 0
    });
    const [insertOrgEvent] = useInsertOrgEvent();
    const [updateOrgEvent] = useUpdateOrgEvent();
    const ref = useRef();

    const handleOnPageChange = () => {
        const { currentPage, pageSize } = (ref as any).current.state;
        const hasNextPage = count > currentPage * pageSize;
        const shouldFetch = hasNextPage && data.length < currentPage * pageSize;
        if (shouldFetch) {
            fetchMore({
                limit: pageSize,
                offset: currentPage + 1
            });
        }
    }

    return (
        <Paper>
            <MaterialTable
                tableRef={ref}
                title="Members"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Details', field: 'details' },
                    { title: 'Location', field: 'location' },
                    { title: 'Start', field: 'startTime' },
                    { title: 'End', field: 'endTime' },
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
    );
}