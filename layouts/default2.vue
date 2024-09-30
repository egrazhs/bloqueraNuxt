<template>
	<vistaCarga />
	<vistaLogin />
	<main id="vista_main" class="min-h-screen">
		<mainHeader />
		<section class="flex" style="min-height: calc(100vh - 72px); max-height: calc(100vh - 72px);">
			<mainNav />
			<article class="p-4 overflow-y-auto w-full">
				<slot></slot>
			</article>
		</section>
	</main>
</template>