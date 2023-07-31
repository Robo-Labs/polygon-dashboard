<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFilteredRowModel,
		getSortedRowModel,
		createColumnHelper,
		type SortingState,
		type TableOptions,
		type ColumnFiltersState,
		type OnChangeFn
	} from '@tanstack/svelte-table';
	import { type Stat, fetchStats, STATS_QUERY_KEY } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		accountFilter,
		debouncedProtocolFilter,
		debouncedTokenFilter,
		tokenFilter
	} from '$lib/stores/filters';
	import { getProtocolBlockExplorer, getProtocolWebsite } from '$lib/utils/protocols';
	import TableCellLink from './TableCellLink.svelte';
	import Icon from '@iconify/svelte';

	let sorting: SortingState = [];
	let columnFilters: ColumnFiltersState = [];

	const query = createQuery({
		queryKey: [`${STATS_QUERY_KEY}:${$accountFilter}`],
		queryFn: () => fetchStats({ account: $accountFilter })
	});

	const columnHelper = createColumnHelper<Stat>();

	const defaultColumns = [
		columnHelper.accessor('protocol', {
			header: 'Protocol',
			footer: 'Protocol',
			cell: (props) =>
				flexRender(TableCellLink, {
					href: getProtocolWebsite(props.getValue()),
					text: props.getValue()
				})
		}),
		columnHelper.accessor('pool', {
			header: 'Pool',
			footer: 'Pool',
			cell: (props) =>
				flexRender(TableCellLink, {
					href: `${getProtocolBlockExplorer(props.row.original.protocol)}/address/${
						props.row.original.poolAddress
					}`,
					text: props.getValue()
				})
		}),
		columnHelper.accessor('token', {
			header: 'Token',
			footer: 'Token',
			cell: (props) =>
				flexRender(TableCellLink, {
					href:
						props.row.original.tokenAddress === 'native'
							? getProtocolBlockExplorer(props.row.original.protocol)
							: `${getProtocolBlockExplorer(props.row.original.protocol)}/address/${
									props.row.original.tokenAddress
							  }`,
					text: props.getValue()
				})
		}),
		columnHelper.accessor('supply', {
			header: 'Supply',
			footer: 'Supply',
			cell: (props) =>
				props
					.getValue()
					.toLocaleString('en', { style: 'currency', currency: 'USD', notation: 'compact' }),
			enableColumnFilter: false
		}),
		columnHelper.accessor('debt', {
			header: 'Debt',
			footer: 'Debt',
			cell: (props) =>
				props
					.getValue()
					.toLocaleString('en', { style: 'currency', currency: 'USD', notation: 'compact' }),
			enableColumnFilter: false
		})
	];

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const setColumnFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
		if (updater instanceof Function) {
			columnFilters = updater(columnFilters);
		} else {
			columnFilters = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnFilters
			}
		}));
	};

	const options = writable<TableOptions<Stat>>({
		data: $query.data?.stats ?? [],
		columns: defaultColumns,
		state: {
			sorting,
			columnFilters
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	const table = createSvelteTable(options);

	for (const header of $table.getLeafHeaders()) {
		if (header.id === 'protocol') {
			debouncedProtocolFilter.subscribe((value) => {
				header.column.setFilterValue(value);
			});
		}
		if (header.id === 'token') {
			debouncedTokenFilter.subscribe((value) => {
				header.column.setFilterValue(value);
			});
		}
	}

	$: if ($query.isSuccess) {
		options.update((options) => ({
			...options,
			data: $query.data?.stats ?? []
		}));
	}
</script>

<div
	class="overflow-x-auto w-full outline outline-1 outline-secondary text-secondary-content rounded shadow-lg"
>
	<table class="table table-lg">
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<button
									class:link={header.column.getCanSort()}
									on:click={header.column.getToggleSortingHandler()}
									class="flex items-center justify-between gap-1"
								>
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
									<div
										class:invisible={!header.column.getIsSorted()}
										class:rotate-180={header.column.getIsSorted() === 'desc'}
									>
										<Icon icon="mdi:chevron-up" class="text-lg" />
									</div>
								</button>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr class="hover:bg-base-200">
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
