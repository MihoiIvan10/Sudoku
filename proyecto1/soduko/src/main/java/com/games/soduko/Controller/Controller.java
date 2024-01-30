package com.games.soduko.Controller;

import com.games.soduko.service.SodukoService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/sudoku")
public class Controller {

    private final SodukoService sodukoService;

    public Controller(SodukoService sodukoService) {
        this.sodukoService = sodukoService;
    }

//            Nuevo Tablero

    @GetMapping("/generarTablero")
    public ResponseEntity<Map<String, Object>> generarTablero(@RequestParam String dificultad) {
        int levelnum;
        switch (dificultad) {
            case "Facil":
                levelnum = 2;

                break;
            case "Medio":
                levelnum = 5;

                break;
            case "Dificil":
                levelnum = 8;

                break;

            default:
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Dificultad no válida: " + dificultad);
                return ResponseEntity.badRequest().body(error);

        }
        int[][] generarTablero = sodukoService.niveles(levelnum);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("board", generarTablero);

        return ResponseEntity.ok(respuesta);
    }

//              Boton verificar

    @PostMapping("/verificar")
    public ResponseEntity<String> verificarSudoku(@RequestBody int[][] sudokuTablero) {
        SodukoService sudokuService = new SodukoService();
        boolean isValid = sudokuService.unidos(sudokuTablero);
        if (isValid) {
            return ResponseEntity.ok("El tablero de Sudoku es válido.");
        } else {
            return ResponseEntity.badRequest().body("El tablero de Sudoku no es válido.");
        }
    }

//             Boton Resolver
  
    @PostMapping("/resolver")
    public ResponseEntity<int [][]> resolverSoduko(@RequestBody int[][] sodukoTablero) {
        SodukoService sodukoServie = new SodukoService();

        sodukoServie.resolver(sodukoTablero);

        return new ResponseEntity<>(sodukoTablero, HttpStatus.OK);
    }
    
}
