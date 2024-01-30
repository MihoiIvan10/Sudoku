package com.games.soduko.service;
import java.util.Arrays;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class SodukoService {

    //                   Verifica el Soduko

    boolean checar_filas(int[][] tablero) {
        int matrix = tablero.length;
    
        for (int i = 0; i < matrix; i++) {
            int[] arr = new int[matrix];
                for (int j = 0; j < matrix; j++) {
                    arr[j] = tablero[j][i];
                }
                Arrays.sort(arr);
                for (int k = 1; k < matrix; k++) {

                    if (arr[k] != 0 && arr[k] == arr[k - 1]) {
                        return false;
                    }
                }
        }
        return true;
    }

    boolean checar_columnas(int[][] tablero) {
        int matrix = tablero.length;

        for (int i = 0; i < matrix; i++) {
            int[] arr = new int[matrix];
                for (int j = 0; j < matrix; j++) {
                    arr[j] = tablero[i][j];
                }
                Arrays.sort(arr);
                for (int k = 1; k < matrix; k++) {

                    if (arr[k] != 0 && arr[k] == arr[k - 1]) {
                        return false;
                    }
                }
        }

        return true;
    }


    boolean checar_cubo(int[][] tablero) {
        int matrix = 9;
        int miniMatrix = 3;
        for (int i = 0; i < matrix; i += miniMatrix) {
            for (int j = 0; j < matrix; j += miniMatrix) {
                boolean[] used = new boolean[matrix];
                for (int fil = i; fil < i + miniMatrix; fil++) {
                    for (int col = j; col < j + miniMatrix; col++) {
                        int num = tablero[fil][col];
    
                        if (num >= 1 && num <= matrix) {
                            if (used[num - 1]) {
                                return false; // Número duplicado encontrado en la submatriz
                            } else {
                                used[num - 1] = true;
                            }
                        }
                    }
                }
            }
        }
    
        return true; // No se encontraron duplicados en ninguna submatriz
    }
    
    public boolean unidos(int[][] board) {
        return checar_filas(board) && checar_columnas(board) && checar_cubo(board);
    }
    
//----------------------------------------------------------------------------------------------------------
//                       Resuelve el soduko
//----------------------------------------------------------------------------------------------------------


    boolean checar_num(int[][] tablero, int fil, int col, int num) {
        int matrix = 9;
        int miniMatrix = 3;

        // Verificar si 'num' no está en la fila actual
        for (int x = 0; x < matrix; x++) {
            if (tablero[fil][x] == num) {
                return false;
            }
        }
    
        //  en la columna actual
        for (int x = 0; x < matrix; x++) {
            if (tablero[x][col] == num) {
                return false;
            }
        }
    
        // en el cuadrante 3x3 actual
        int startRow = fil - fil % miniMatrix;
        int startCol = col - col % miniMatrix;
        for (int i = 0; i < miniMatrix; i++) {
            for (int j = 0; j < miniMatrix; j++) {
                if (tablero[i + startRow][j + startCol] == num) {
                    return false;
                }
            }
        }
    
        return true; 
    }
    
    boolean resolverSudoku(int[][] tablero) {
        int matrix = 9;
        for (int i = 0; i < matrix; i++) {
            for (int j = 0; j < matrix; j++) {
                if (tablero[i][j] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (checar_num(tablero, i, j, num)) {
                            tablero[i][j] = num;
    
                            if (resolverSudoku(tablero)) {
                                return true;
                            }
                            tablero[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    public void resolver(int[][] tablero) {
        resolverSudoku(tablero);
    }

//-----------------------------------------------------------------------------------------------------------
//                                        NEW GAME
//-----------------------------------------------------------------------------------------------------------
    public boolean cubo1(int[][] board, int i, int j, int num){

        int miniMatrix = 3;
                
        int Fil = i - i % miniMatrix;
        int Col = j - j % miniMatrix;
        for (int ii = 0; ii < miniMatrix; ii++) {
            for (int jj = 0; jj < miniMatrix; jj++) {
                if (board[ii + Fil][jj + Col] == num) {
                    return false;
                }
            }
        }
        return true;
    }

    public int[][] nuevoTablero() {
        int[][] tablero = new int[9][9];
        Random random = new Random();



        for (int i=0; i<tablero.length; i++) {
            for (int j=0; j<tablero.length; j++) {
                tablero[i][j] = 0;
            }
        }

        for(int i=1; i<3; i++){
            int ini = 3 * (i-1);
            int fin = 3 * i;

            for(int j=ini; j<fin; j++){
                for(int k=ini; k<fin; k++){
                    int num = random.nextInt(9) + 1; 
                    if (cubo1(tablero, j, k, num)){ 
                    tablero[j][k] = num;
                    }
                    else{
                        k--;
                    }

                }
            }
        }
        
        resolver(tablero);

        return tablero;
    }

    public int[][] niveles(int n){

        Random rand = new Random();

        int[][] b = nuevoTablero();
        //solve(b);
        for(int i=0;i<b.length; i++){
            for(int j=0; j<b[0].length; j++){
                int aux = j;
                int num = rand.nextInt(n+1);
                j+=num;
                for(int k = aux; k<j && k<b.length; k++){
                    b[i][k] = 0;
                }
            }
        }
        return b;
    }
}


//---------------------------------------------------------------------------------------------------


