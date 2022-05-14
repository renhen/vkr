from datetime import date, datetime
from typing import List

from backend.app.db.repositories.base import BaseRepository
from backend.app.models.core import NameCountBase
from backend.app.models.dtp import PointModel, ParticipantsModel, DTPRecordModel


class DTPRepository(BaseRepository):

    async def get_points(self, start: date, end: date):
        print(datetime.combine(start, datetime.min.time()))
        records = await self.db.fetch_all(
            query="SELECT id, longitude, latitude FROM dtp.dtp WHERE datetime between :start and :end",
            values={"start": datetime.combine(start, datetime.min.time()),
                    "end": datetime.combine(end, datetime.min.time())}
        )
        return [PointModel(**o) for o in records]

    async def get_dtp_by_id(self, _id: int):
        dtp_record = await self.db.fetch_one(
            query="""
            select dtp.id, category.name as category, light.name as light, severity.name as severity, longitude, latitude, address, datetime as _datetime, dead_count, injured_count, participants_count from dtp.dtp
            join dtp.category on category.id = dtp.category_id
            join dtp.light on light.id = light_id
            join dtp.severity on severity.id = severity_id
            where dtp.id=:id;
            """,
            values={"id": _id}
        )
        if dtp_record is None:
            return None
        db_nearby_record = await self.db.fetch_all(
            query="""
            SELECT name from dtp.dtp_has_nearby
            join dtp.nearby on nearby.id = nearby_id
            where dtp_id=:id;
            """,
            values={"id": _id}
        )
        db_participant_categories = await self.db.fetch_all(
            query="""
                    SELECT name from dtp.dtp_has_participant_categories
                    join dtp.participant_categories on participant_categories.id = participant_categories_id
                    where dtp_id=:id;
                    """,
            values={"id": _id}
        )
        db_road_conditions = await self.db.fetch_all(
            query="""
                    SELECT name from dtp.dtp_has_road_conditions
                    join dtp.road_conditions on road_conditions.id = road_conditions_id
                    where dtp_id=:id;
                    """,
            values={"id": _id}
        )
        db_weather = await self.db.fetch_all(
            query="""
                    SELECT name from dtp.dtp_has_weather
                    join dtp.weather on weather.id = weather_id
                    where dtp_id=:id;
                    """,
            values={"id": _id}
        )
        nearby = [o["name"] for o in db_nearby_record]
        participants_categories = [o["name"] for o in db_participant_categories]
        road_conditions = [o["name"] for o in db_road_conditions]
        weather = [o["name"] for o in db_weather]
        participants_record = await self.db.fetch_all(
            query="""
            select participants.id, gender, role.name as role, health_status.name as health_status from dtp.dtp_has_participants
            join dtp.participants on participants.id = participants_id
            join dtp.`role` on role.id = role_id
            join dtp.health_status on health_status.id = health_status_id
            where dtp_id = :id;
            """,
            values={"id": _id}
        )
        participants = [ParticipantsModel(**o) for o in participants_record]
        for i in participants:
            violations_record = await self.db.fetch_all(
                query="""
                select * from dtp.participants_has_violations
                join dtp.violations on violations.id = violations_id
                where participants_id = :id;
                """,
                values={"id": i.id}
            )
            i.violations = [o['name'] for o in violations_record]
        dtp_record = DTPRecordModel(**dtp_record)
        dtp_record.nearby = nearby
        dtp_record.participants = participants
        dtp_record.weather = weather
        dtp_record.road_condition = road_conditions
        dtp_record.participants_categories = participants_categories
        return dtp_record

    async def top_driver_violations(self, limit: int):
        record = await self.db.fetch_all(
            query="""
            SELECT violations.name, count(*) as count FROM dtp.participants
            join dtp.participants_has_violations on participants_id = participants.id
            join dtp.violations on violations_id = violations.id
            where participants.role_id = 1 and violations.id != 1
            group by violations_id
            order by count DESC 
            limit :limit;
            """,
            values={"limit": limit}
        )
        return [NameCountBase(**o) for o in record]

    async def count_driver_violations(self):
        return (await self.db.fetch_one(
            query=
            """
            SELECT sum(count) as sum from (SELECT violations.name, count(*) as count FROM dtp.participants
            join dtp.participants_has_violations on participants_id = participants.id
            join dtp.violations on violations_id = violations.id
            where participants.role_id = 1
            group by violations_id
            order by count DESC) as tasa;
            """
        ))['sum']

    async def top_passenger_violations(self, limit: int):
        record = await self.db.fetch_all(
            query="""
            SELECT violations.name, count(*) as count FROM dtp.participants
            join dtp.participants_has_violations on participants_id = participants.id
            join dtp.violations on violations_id = violations.id
            where participants.role_id = 2 and violations.id != 22
            group by violations_id
            order by count DESC 
            limit :limit;
            """,
            values={"limit": limit}
        )
        return [NameCountBase(**o) for o in record]

    async def count_passenger_violations(self):
        return (await self.db.fetch_one(
            query=
            """
            SELECT sum(count) as sum from (SELECT violations.name, count(*) as count FROM dtp.participants
            join dtp.participants_has_violations on participants_id = participants.id
            join dtp.violations on violations_id = violations.id
            where participants.role_id = 2
            group by violations_id
            order by count DESC) as tasa;
            """
        ))['sum']

    async def count_weather(self):
        db_weather = await self.db.fetch_all(
            query="""
            SELECT name, count(*) as count from dtp.dtp_has_weather
            join dtp.weather on weather.id = weather_id
            group by name
            order by count DESC;
            """,
        )
        return [NameCountBase(**o) for o in db_weather]

    async def count_light(self):
        db_weather = await self.db.fetch_all(
            query="""
            SELECT light.name, count(*) as count from dtp.dtp
            join dtp.light on light.id = light_id
            group by name
            order by count DESC;
            """,
        )
        return [NameCountBase(**o) for o in db_weather]
