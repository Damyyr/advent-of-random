import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.regex.Pattern;

class Four {
  public static String testFileName = "4-input-test.txt";
  public static String fileName = "4-input.txt";
  public static String inputFile = fileName;

  public static void main(String[] args) {
    List<Instruction> instructions = ParseInstructions();

    // Be sure instructions are correctly parsed
    // for (Instruction instruction : instructions) {
    //   instruction.Print();
    // }

    String[][] setups1 = { {"Z", "N"}, {"M", "C", "D"}, {"P"} };
    String[][] setups2 = {
        { "R", "N", "F", "V", "L", "J", "S", "M" },
        { "P", "N", "D", "Z", "F", "J", "W", "H" },
        { "W", "R", "C", "D", "G" },
        { "N", "B", "S" },
        { "M", "Z", "W", "P", "C", "B", "F", "N" },
        { "P", "R", "M", "W" },
        { "R", "T", "N", "G", "L", "S", "W" },
        { "Q", "T", "H", "F", "N", "B", "V" },
        { "L", "M", "H", "Z", "N", "F" } };

    String[][] setups = setups2;
    Stack[] stacks = new Stack[setups.length];

    // Assign stacks
    for (int i = 0; i < setups.length; i++) {
      stacks[i] = new Stack(setups[i]);
    }

    for (Instruction instruction : instructions) {
      Integer from = instruction.from - 1;
      Integer to = instruction.to - 1;

      // Crate[] crates = stacks[from].Depile(instruction.moving); // first challenge
      Crate[] crates = stacks[from].DepileStraigth(instruction.moving); // second challenge
      for (Crate crate : crates) {
        stacks[to].EmpileOne(crate);
      }
    }

    // Readable output
    for (int i = 0; i < setups.length; i++) {
      System.out.println("stack: " + (1+i) + " : " + stacks[i].PeekId());
    }

    // Answer output
    for (int i = 0; i < setups.length; i++) {
      System.out.print(stacks[i].PeekId());
    }
    System.out.println();
  }

  public static Integer[] SplitSentence(String inputText){
    String str = "\\D+";
    Pattern pattern = Pattern.compile(str);
    String[] split = pattern.split(inputText);

    Integer[] returned = {0,0,0};
    for (int i = 1; i < split.length; i++) {
      if(split[i] != "") //Matcher always match an empty prefix, dunno why
        returned[i-1] = Integer.parseInt(split[i]);
    }

    return returned;
  }

  static class Instruction {
    Integer moving;
    Integer from;
    Integer to;

    public Instruction(Integer moving, Integer from, Integer to){
      this.moving = moving;
      this.from = from;
      this.to = to;
    }

    // Debug method
    public void Print(){
      System.out.println("move " + this.moving + " from " + this.from + " to " + this.to);
    }
  }

   static class Crate {
    String id;

    // I don't know how to make attributes in Java
    public Crate(String id) {
      this.id = id;
    }

    public String Id(){ return this.id; }
   }

   static class Stack {
    Deque<Crate> crates;

    public Stack(String[] ids){
      this.crates = new ArrayDeque<Crate>();

      for (String id : ids) {
        EmpileOne(new Crate(id));
      }
    }

    public void EmpileOne(Crate crate){
      this.crates.push(crate);
    }

    public Crate[] DepileStraigth(Integer nb) {
      Crate[] crates = Depile(nb);
      Crate[] orderedCrates = new Crate[nb];
      for (int i = 0; i < nb; i++) {
        orderedCrates[i] = crates[crates.length-1 - i];
      }

      return orderedCrates;
    }

    public Crate[] Depile(Integer nb) {
      Crate[] depiled = new Crate[nb];
      for (int i = 0; i < nb; i++) {
        depiled[i] = this.crates.pop();
      }

      return depiled;
    }

    public String PeekId(){
      return this.crates.peek().Id();
    }

    // Debug method
    public void Print(){
      for (Crate crate : this.crates) {
        System.out.print("[" + crate.id + "] "); 
        System.out.println();
      }
    }
   }

   public static List<Instruction> ParseInstructions(){
    File file = new File(inputFile);
    List<Instruction> list = new ArrayList<Instruction>();

    try (FileReader fr = new FileReader(file)) {
      BufferedReader br = new BufferedReader(fr);
      String line;
      while((line = br.readLine()) != null){
          Integer[] readInput = SplitSentence(line);
          list.add(new Instruction(readInput[0], readInput[1], readInput[2]));
          // System.out.println(line);
      }
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return list;
   }

}