import { Paper, List, ListItem } from '@material-ui/core';
import useOrganizations from '../hooks/organizations.hooks';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

export const Organizations = (): JSX.Element => {
    const { organizations, loading, loadMore, hasNextPage } = useOrganizations();
    const count = hasNextPage ? organizations.length + 1 : organizations.length;
    const loadMoreOrganizations = loading ? () => { } : loadMore;
    const isLoaded = i => !hasNextPage || i < organizations.length;

    return (
        <Paper>
            <AutoSizer>{({ height, width }) =>
                <InfiniteLoader
                    isItemLoaded={isLoaded}
                    itemCount={count}
                    loadMoreItems={loadMoreOrganizations}>
                    {({ onItemsRendered, ref }) =>
                        <List
                            height={height}
                            width={width}
                            itemCount={count}
                            itemSize={40}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {({ index, style }) => {
                                let content;
                                if (!isLoaded(index)) {
                                    return <ListItem>
                                        Loading...
                                    </ListItem>
                                }
                                const { name, id } = organizations[index];
                                content = name;
                                return <ListItem key={`${id}`}>
                                    {name}
                                </ListItem>
                            }}
                        </List>
                    }
                </InfiniteLoader>
            }</AutoSizer>
        </Paper>
    )
}