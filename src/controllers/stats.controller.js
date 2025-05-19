const { sequelize } = require('../repos/db');

exports.topUsers = async (req, res, next) => {
  try {
    console.time('topUsersQuery');
    const [results] = await sequelize.query(`
      SELECT
        u.id AS user_id,
        u.username,
        SUM(o.total_amount) AS total_spent,
        (
          SELECT oi.menu_item_id
          FROM OrderItems oi
          JOIN Orders o2 ON oi.order_id = o2.id
          WHERE o2.user_id = u.id AND o2.status = 'completed' AND o2.created_at >= DATE('now', '-1 month')
          GROUP BY oi.menu_item_id
          ORDER BY COUNT(*) DESC
          LIMIT 1
        ) AS most_ordered_menu_item_id
      FROM Users u
      JOIN Orders o ON o.user_id = u.id
      WHERE o.status = 'completed' AND o.created_at >= DATE('now', '-1 month')
      GROUP BY u.id
      ORDER BY total_spent DESC
      LIMIT 10
    `);
    console.timeEnd('topUsersQuery');
    res.json(results);
  } catch (err) {
    next(err);
  }
}; 