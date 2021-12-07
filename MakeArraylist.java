package com.nl1.캡슐화;

import java.util.Scanner;

public class MakeArraylist {
    static Scanner sc = new Scanner(System.in);

    public static void main(String... args) {
        ExamConsole ex = new ExamConsole();
        boolean loop = true;

        while (loop) {
            int m = menu();
            switch (m) {
                case 1 -> ex.input();
                case 2 -> ex.output();
                case 3 -> {
                    System.out.println("프로그램 종료.");
                    loop = false;
                }
                default -> System.out.println("잘못된 값을 입력하셨습니다. 메뉴는 1~3까지입니다.");
            }
        }
        sc.close();
    }

    static int menu() {
        System.out.println("      -메인 메뉴-");
        System.out.println("\t1. 성적입력 ");
        System.out.println("\t2. 성적출력 ");
        System.out.println("\t3. 종료 ");
        System.out.print("\t선택> ");
        return sc.nextInt();
    }

}
