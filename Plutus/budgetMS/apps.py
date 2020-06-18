from django.apps import AppConfig


class BudgetmsConfig(AppConfig):
    name = 'budgetMS'



def POST(self):
        form = web.input(name="a", date="s", amount="d")
        conn = MySQLdb.connect(host= "localhost", user="root", passwd="", db="pdb")
        x = conn.cursor()
        x.execute("SELECT * FROM budgetms_incomes")
        conn.commit()
        items = cursor.fetchall()
        for row in items:
            print row[0], row[1]
        conn.rollback()
        conn.close()
        return render.index(items)