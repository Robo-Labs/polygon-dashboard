<script lang="ts">
	import { writable } from 'svelte/store';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import { createColumnHelper, type TableOptions } from '@tanstack/table-core';
	import { type Stat, fetchStats, STATS_QUERY_KEY } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';
	import { accountFilter } from '$lib/stores/filters';

	const query = createQuery({
		queryKey: [`${STATS_QUERY_KEY}:${$accountFilter}`],
		queryFn: () => fetchStats({ account: $accountFilter })
	});

	const columnHelper = createColumnHelper<Stat>();

	const defaultColumns = [
		columnHelper.accessor('protocol', {
			header: 'Protocol',
			footer: 'Protocol'
		}),
		columnHelper.accessor('token', {
			header: 'Token',
			footer: 'Token'
		}),
		columnHelper.accessor('supply', {
			header: 'Supply',
			footer: 'Supply',
			cell: (props) =>
				props
					.getValue()
					.toLocaleString('en', { style: 'currency', currency: 'USD', notation: 'compact' })
		}),
		columnHelper.accessor('debt', {
			header: 'Debt',
			footer: 'Debt',
			cell: (props) =>
				props
					.getValue()
					.toLocaleString('en', { style: 'currency', currency: 'USD', notation: 'compact' })
		})
	];

	const options = writable<TableOptions<Stat>>({
		data: $query.data?.stats ?? [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	$: if ($query.isSuccess) {
		options.update((options) => ({
			...options,
			data: $query.data?.stats ?? []
		}));
	}

	const table = createSvelteTable(options);
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
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody>
			{#each $table.getRowModel().rows as row}
				<tr>
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
