package com.attendance.eas;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.w3c.dom.Text;

public class Menu extends AppCompatActivity {

    TextView d1, d2, d3, d4, d5;
    TextView a1, a2, a3, a4, a5;
    String da1, da2, da3, da4, da5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu2);

        TypeStore typeStore=new TypeStore();

        da1="";
        da2="";
        da3="";
        da4="";
        da5="";

        TextView course=findViewById(R.id.btn_course_selection);
        TextView scan=findViewById(R.id.btn_invigilator_scan_id);
        TextView attendace=findViewById(R.id.btn_attendance);
        TextView stats=findViewById(R.id.btn_exam_stats);
        TextView help=findViewById(R.id.btn_help);
        LinearLayout dashboard=findViewById(R.id.dashboard);
        LinearLayout menu=findViewById(R.id.menu);
        View dashaboardLayout=findViewById(R.id.dashboard_layout);

        //these are for deactivating
        d1=dashaboardLayout.findViewById(R.id.d1);
        d2=dashaboardLayout.findViewById(R.id.d2);
        d3=dashaboardLayout.findViewById(R.id.d3);
        d4=dashaboardLayout.findViewById(R.id.d4);
        d5=dashaboardLayout.findViewById(R.id.d5);

        a1=dashaboardLayout.findViewById(R.id.action1);
        a2=dashaboardLayout.findViewById(R.id.action2);
        a3=dashaboardLayout.findViewById(R.id.action3);
        a4=dashaboardLayout.findViewById(R.id.action4);
        a5=dashaboardLayout.findViewById(R.id.action5);

        TextView logout=dashaboardLayout.findViewById(R.id.logout);

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                startActivity(new Intent(getApplicationContext(), LogIn.class));
            }
        });

        d1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(da1.equals("")){
                    d1.setText("activate");
                    da1="activate";
                    a1.setText("deactivate");
                }else{
                    d1.setText("deactivate");
                    da1="";
                    a1.setText("activate");
                }
            }
        });

        d2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(da2.equals("")){
                    d2.setText("activate");
                    da2="activate";
                    a2.setText("deactivate");
                }else{
                    d2.setText("deactivate");
                    da2="";
                    a2.setText("activate");
                }
            }
        });

        d3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(da3.equals("")){
                    d3.setText("activate");
                    da3="activate";
                    a3.setText("deactivate");
                }else{
                    d3.setText("deactivate");
                    da3="";
                    a3.setText("activate");
                }
            }
        });

        d4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(da4.equals("")){
                    d4.setText("activate");
                    da4="activate";
                    a4.setText("deactivate");
                }else{
                    d4.setText("deactivate");
                    da4="";
                    a4.setText("activate");
                }
            }
        });

        d5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(da5.equals("")){
                    d5.setText("activate");
                    da5="activate";
                    a5.setText("deactivate");
                }else{
                    d5.setText("deactivate");
                    da5="";
                    a5.setText("activate");
                }

            }
        });

        dashboard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dashaboardLayout.setVisibility(View.VISIBLE);
                menu.setBackgroundResource(R.color.white);
                dashboard.setBackgroundResource(R.color.blue);
            }
        });

        menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                dashaboardLayout.setVisibility(View.GONE);
                menu.setBackgroundResource(R.color.blue);
                dashboard.setBackgroundResource(R.color.white);


            }
        });
        course.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getApplicationContext(), CourseSelect.class);
                intent.putExtra("type", "admin");
                startActivity(intent);

            }
        });

        scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), ScanId.class));
            }
        });

        attendace.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), Attendace.class));
            }
        });

        stats.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), Stats.class));
            }
        });

        help.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), Help.class));
            }
        });

    }
}