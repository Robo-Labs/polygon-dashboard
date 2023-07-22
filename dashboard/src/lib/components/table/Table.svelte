<script lang="ts">
	import { writable } from 'svelte/store';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import { createColumnHelper, type TableOptions } from '@tanstack/table-core';
	import { type Stat, fetchStats } from '$lib/queries/stats';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['stats'],
		queryFn: () => fetchStats({ fetch })
	});

	const columnHelper = createColumnHelper<Stat>();

	const defaultColumns = [
		columnHelper.accessor('protocol', {
			header: 'Protocol',
			footer: 'Protocol'
		}),
		columnHelper.accessor('pool', {
			header: 'Pool',
			footer: 'Pool'
		}),
		columnHelper.accessor('supply', {
			header: 'Supply',
			footer: 'Supply',
			cell: (props) =>
				props.getValue().toLocaleString('en-US', { style: 'currency', currency: 'USD' })
		}),
		columnHelper.accessor('debt', {
			header: 'Debt',
			footer: 'Debt',
			cell: (props) =>
				props.getValue().toLocaleString('en-US', { style: 'currency', currency: 'USD' })
		})
	];

	const options = writable<TableOptions<Stat>>({
		data: $query.data ?? [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	$: if ($query.isSuccess) {
		options.update((options) => ({
			...options,
			data: $query.data ?? []
		}));
	}

	const table = createSvelteTable(options);
</script>

<div
	class="overflow-x-auto w-full outline outline-1 outline-secondary bg-secondary text-secondary-content rounded-box shadow-lg"
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
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.footer, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
</div>

<style>
	.table :where(thead, tfoot) {
		color: hsl(var(--sc) / 0.6);
	}
</style>
