import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Build {
    final static String indent = "    ";

    static String buildHtml() throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("$(\".calculator\").html(\n");
        for(var line : Files.readAllLines(Path.of("src/calculator.html"))) {
            sb.append(indent)
                .append(line.replaceAll("^( *)([^ ])", "$1'$2"))
                .append("' +\n");
        }
        sb.delete(sb.length()-2, sb.length());
        sb.append("\n);");
        return sb.toString().trim();
    }
    static String buildJs() throws IOException {
        List<String> codes = new ArrayList<>();
        for(Path path : findJsScripts()) {
            String code = Files.readString(path).trim();
            String comment = Path.of("src").relativize(path).toString().replace("\\", "/").replace(".js", "");
            codes.add("// " + comment + "\n" + code);
        }
        return String.join("\n\n", codes);
    }
    static List<Path> findJsScripts() throws IOException {
        String index = Files.readString(Path.of("index.html"));
        Pattern pattern = Pattern.compile("<script.+src=\"((\\w+[\\/\\\\]?)+\\.js)\">");
        Matcher matcher = pattern.matcher(index);
        List<Path> result = new ArrayList<>();
        while(matcher.find()) {
            result.add(Path.of(matcher.group(1)));
        }
        return result;
    }

    public static void main(String[] args) throws IOException {
        Files.createDirectories(Path.of("build"));
        Files.writeString(Path.of("build/indexs.js"), buildHtml() + "\n\n" + buildJs());
    }
}
