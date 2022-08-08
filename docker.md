### DOCKER

- Pobieranie obrazu
	`docker pull foo`

- Wyświetlanie pobranych obrazów
	`docker images`

- Odpalanie obrazu jako detached 
	`docker run -d`	

- Mapowanie portów
	`-p localhost:kontener`
	- Można mapować kilka portów zewnętrznych do jednego w kontenerze
		dodaje się po prostu dodatkowe `-p localhost2:kontener`

- Zatrzymywanie kontenerów 
	`docker stop id/name`
	-	Kontener jest stopowany ale nie usuwany, więc możemy go jeszcze raz uruchomić
	`docker start id/name`

- `docker ps` wyświetla tylko działające kontenery
- `docker ps -a` wyświetli wszystkie
