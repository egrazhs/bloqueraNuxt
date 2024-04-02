<template>
	<section id="vista_login" class="hidden min-h-screen flex justify-center items-center bg-blue-800">
		<div class="py-8 px-4">
			<article class="bg-white p-8 rounded-xl">
				<img src="~/assets/images/logo_transparente.png" class="w-40 mb-4 block mx-auto" draggable="false" >

				<div>
					<label for="username" class="font-bold">Usuario:</label>
					<input type="text" id="login_username" name="username" placeholder="Usuario" class="w-full border-black border-2 rounded-lg px-2">
				</div>

				<div class="my-4">
					<label for="password" class="font-bold">Contraseña:</label>
					<input type="password" id="login_password" name="password" placeholder="Contraseña" class="w-full border-black border-2 rounded-lg px-2">
				</div>

				<button id="login_boton_acceder", class="bg-blue-800 hover:bg-blue-900 text-white py-2 px-8 rounded-lg">Acceder</button>
			</article>
		</div>
	</section>
</template>