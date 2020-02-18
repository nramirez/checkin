import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, FormControlLabel, Checkbox, List, ListItem } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import useOrganizations from '../hooks/organizations.hooks';
import InfiniteLoading from 'react-simple-infinite-loading';

export const Organizations = (): JSX.Element => {
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const loadMoreOrganizations = loading ? () => { } : loadMore;
    const isLoaded = i => !hasNextPage || i < organizations.length;
    console.log(organizations, loading);

    return (
        <Paper>
            <div>
                Hola {organizations.length}
            </div>
                
            <InfiniteLoading
                items={organizations}
                itemHeight={40}
                hasMoreItems={hasNextPage}
                loadMoreItems={loadMoreOrganizations}>
               
               {({ index, style }) => {
                    
                    console.log(index);
                    let content;
                    if (!isLoaded(index)) {
                        content = 'Loading...'
                    } else {

                        const { name, enabled } = organizations[index];
                        content =
                            <FormControlLabel
                                control={
                                    <Checkbox checked={enabled} value="checkedA" />
                                }
                                label={name}
                            />
                    }
                    return <ListItem>
                        {content}
                    </ListItem>;
                }}
            </InfiniteLoading>
        </Paper>
    )
}


/*

 {({ index, style }) => {
                    
                    console.log(index);
                    let content;
                    if (!isLoaded(index)) {
                        content = 'Loading...'
                    } else {

                        const { name, enabled } = organizations[index];
                        content =
                            <FormControlLabel
                                control={
                                    <Checkbox checked={enabled} value="checkedA" />
                                }
                                label={name}
                            />
                    }
                    return <div>
                        {content}
                    </div>;
                }}


<TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableCell>
                        Actions
                     </TableCell>
                    <TableCell>
                        Name
                     </TableCell>
                    <TableCell>
                        Enabled
                     </TableCell>
                </TableHead>
                <TableBody>
                    <InfiniteLoadingList
                        items={organizations}
                        itemsHeight={40}
                        hasMoreItems={hasNextPage}
                        loadMoreItems={loadMoreOrganizations}>
                        {({ index, style }) => {
                            if (!isLoaded(index)) {
                                return <TableRow>

                                    <TableCell colSpan={3} >
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            }
                            const { name, enabled } = organizations[index];
                            return <TableRow>
                                <TableCell>
                                    Actions
                                   </TableCell>
                                <TableCell>
                                    {name}
                                </TableCell>
                                <TableCell>
                                    {enabled}
                                </TableCell>
                            </TableRow>
                        }}
                    </InfiniteLoadingList>
                </TableBody>
            </Table>
        </TableContainer>*/