import requests

BASE_URL = "http://localhost:3000"

# Función para probar la creación de un animal
def crear_animal():
    data = {
        "tipo": "Vaca",
        "fecha": "2024-12-16",
        "cultivo": "Maíz"
    }
    response = requests.post(f"{BASE_URL}/animales", json=data)
    print("Crear Animal:", response.status_code, response.json())

# Función para obtener todos los animales
def obtener_animales():
    response = requests.get(f"{BASE_URL}/animales")
    print("Obtener Animales:", response.status_code, response.json())

# Función para obtener un animal por ID
def obtener_animal_por_id(animal_id):
    response = requests.get(f"{BASE_URL}/animales/{animal_id}")
    print(f"Obtener Animal {animal_id}:", response.status_code, response.json())

# Función para actualizar un animal por ID
def actualizar_animal(animal_id):
    data = {
        "tipo": "Caballo",
        "fecha": "2024-12-15",
        "cultivo": "Trigo"
    }
    response = requests.put(f"{BASE_URL}/animales/{animal_id}", json=data)
    print(f"Actualizar Animal {animal_id}:", response.status_code, response.json())

# Función para eliminar un animal por ID
def eliminar_animal(animal_id):
    response = requests.delete(f"{BASE_URL}/animales/{animal_id}")
    print(f"Eliminar Animal {animal_id}:", response.status_code)

# Probar la API
if __name__ == "__main__":
    print("--- Probando API Animales ---")
    #crear_animal()           # Crear un nuevo animal
    obtener_animales()       # Obtener todos los animales
    #animal_id = 1            # ID del animal que deseas probar
    #obtener_animal_por_id(animal_id)  # Obtener un animal por ID
    #actualizar_animal(animal_id)      # Actualizar un animal
    #eliminar_animal(animal_id)        # Eliminar un animal
